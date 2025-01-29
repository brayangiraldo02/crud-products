CREATE TABLE IF NOT EXISTS Product (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    stock INTEGER NOT NULL DEFAULT 0,
    price NUMERIC(10, 2) NOT NULL, -- hasta dos decimales
    status BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Storage (
    id SERIAL PRIMARY KEY,
    location VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 0,
    status BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO Product (name, description, stock, price, status)
VALUES
('Laptop', 'High-end gaming laptop', 10, 1500.00, TRUE),
('Mouse', 'Wireless ergonomic mouse', 50, 20.99, TRUE),
('Keyboard', 'Mechanical keyboard with RGB', 30, 80.50, TRUE);

Insert INTO Storage (location, capacity) VALUES
('Warehouse A', 1000),
('Warehouse B', 500),
('Warehouse C', 200);
