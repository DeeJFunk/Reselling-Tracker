DROP DATABASE IF EXISTS reseller WITH (FORCE);
CREATE DATABASE reseller;

\c reseller;

CREATE TABLE product(
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    product_desc VARCHAR(255) NOT NULL,
    product_category VARCHAR(255) NOT NULL,
    sale_prices JSONB NOT NULL,
    available BOOLEAN NOT NULL DEFAULT FALSE,
    date_purchased DATE,
    date_sold DATE
);

\i populate.sql

