-- Migration: Grocery Add Order Index Column
-- Created: 2026-04-11
-- Description: Adiciona a coluna order_index para persistir as ordens do Drag and Drop no front-end.

ALTER TABLE shopping_items 
ADD COLUMN IF NOT EXISTS order_index INTEGER DEFAULT 0;

COMMENT ON COLUMN shopping_items.order_index IS 'Position format index for UI sorting';
