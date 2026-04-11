-- Migration: Grocery Add Stock Column
-- Created: 2026-04-11
-- Description: Adiciona a coluna stock na tabela shopping_items para gerenciar estoque nativo vs comprar.

ALTER TABLE shopping_items 
ADD COLUMN IF NOT EXISTS stock DECIMAL(10, 2) DEFAULT 0;

COMMENT ON COLUMN shopping_items.stock IS 'Quantity available in stock (estoque)';
COMMENT ON COLUMN shopping_items.quantity IS 'Quantity required to buy (comprar)';
