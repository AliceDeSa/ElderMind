-- Migration: Grocery Shopping List Tables
-- Created: 2026-02-08
-- Description: Tables for managing shopping lists and items

-- Table: shopping_lists
CREATE TABLE IF NOT EXISTS shopping_lists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name VARCHAR(255) NOT NULL,
  estimated_total DECIMAL(10, 2) DEFAULT 0,
  actual_total DECIMAL(10, 2) DEFAULT 0,
  status VARCHAR(50) DEFAULT 'planning' CHECK (status IN ('planning', 'shopping', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: shopping_items
CREATE TABLE IF NOT EXISTS shopping_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  list_id UUID REFERENCES shopping_lists(id) ON DELETE CASCADE NOT NULL,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) DEFAULT 'other',
  quantity DECIMAL(10, 2) DEFAULT 1,
  unit VARCHAR(50) DEFAULT 'un',
  estimated_price DECIMAL(10, 2) DEFAULT 0,
  actual_price DECIMAL(10, 2),
  is_purchased BOOLEAN DEFAULT FALSE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_shopping_lists_user_id ON shopping_lists(user_id);
CREATE INDEX idx_shopping_lists_status ON shopping_lists(status);
CREATE INDEX idx_shopping_items_list_id ON shopping_items(list_id);
CREATE INDEX idx_shopping_items_category ON shopping_items(category);

-- Row Level Security (RLS)
ALTER TABLE shopping_lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE shopping_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies for shopping_lists
CREATE POLICY "Users can view their own shopping lists"
  ON shopping_lists FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own shopping lists"
  ON shopping_lists FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own shopping lists"
  ON shopping_lists FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own shopping lists"
  ON shopping_lists FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for shopping_items
CREATE POLICY "Users can view items from their lists"
  ON shopping_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM shopping_lists
      WHERE shopping_lists.id = shopping_items.list_id
      AND shopping_lists.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create items in their lists"
  ON shopping_items FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM shopping_lists
      WHERE shopping_lists.id = shopping_items.list_id
      AND shopping_lists.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update items in their lists"
  ON shopping_items FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM shopping_lists
      WHERE shopping_lists.id = shopping_items.list_id
      AND shopping_lists.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete items from their lists"
  ON shopping_items FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM shopping_lists
      WHERE shopping_lists.id = shopping_items.list_id
      AND shopping_lists.user_id = auth.uid()
    )
  );

-- Trigger to update shopping_lists totals
CREATE OR REPLACE FUNCTION update_shopping_list_totals()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE shopping_lists
  SET 
    estimated_total = (
      SELECT COALESCE(SUM(estimated_price * quantity), 0)
      FROM shopping_items
      WHERE list_id = COALESCE(NEW.list_id, OLD.list_id)
    ),
    actual_total = (
      SELECT COALESCE(SUM(COALESCE(actual_price, 0) * quantity), 0)
      FROM shopping_items
      WHERE list_id = COALESCE(NEW.list_id, OLD.list_id)
      AND is_purchased = true
    ),
    updated_at = NOW()
  WHERE id = COALESCE(NEW.list_id, OLD.list_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Trigger on shopping_items changes
CREATE TRIGGER trigger_update_shopping_list_totals
AFTER INSERT OR UPDATE OR DELETE ON shopping_items
FOR EACH ROW
EXECUTE FUNCTION update_shopping_list_totals();

-- Trigger to update updated_at on shopping_lists
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_shopping_lists_updated_at
BEFORE UPDATE ON shopping_lists
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_shopping_items_updated_at
BEFORE UPDATE ON shopping_items
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Comments for documentation
COMMENT ON TABLE shopping_lists IS 'Shopping lists created by users';
COMMENT ON TABLE shopping_items IS 'Items within shopping lists';
COMMENT ON COLUMN shopping_lists.status IS 'Status: planning, shopping, completed';
COMMENT ON COLUMN shopping_items.category IS 'Category: frutas, carnes, laticínios, limpeza, outros';
