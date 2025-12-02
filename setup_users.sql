\set app_password :'BOOKING_APP_PASSWORD'
\set readonly_password :'BOOKING_READONLY_PASSWORD'

-- Applikationsanvändare (booking_app)
CREATE USER booking_app WITH PASSWORD :'app_password';
GRANT CONNECT ON DATABASE booking_db TO booking_app;
GRANT USAGE ON SCHEMA public TO booking_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO booking_app;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO booking_app;

-- Läsanvändare (booking_readonly)
CREATE USER booking_readonly WITH PASSWORD :'readonly_password';
GRANT CONNECT ON DATABASE booking_db TO booking_readonly;
GRANT USAGE ON SCHEMA public TO booking_readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO booking_readonly;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT SELECT ON TABLES TO booking_readonly;





DO $$ 
BEGIN
    -- 1. Skapa Applikationsanvändaren (READ/WRITE)
    IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'booking_app') THEN
        RAISE NOTICE 'Creating role booking_app...';
        CREATE ROLE booking_app WITH LOGIN PASSWORD :'app_password';
    ELSE
        RAISE NOTICE 'Role booking_app already exists.';
    END IF;

    -- 2. Skapa Läsanvändaren (READ-ONLY)
    IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'booking_readonly') THEN
        RAISE NOTICE 'Creating role booking_readonly...';
        CREATE ROLE booking_readonly WITH LOGIN PASSWORD :'readonly_password';
    ELSE
        RAISE NOTICE 'Role booking_readonly already exists.';
    END IF;

END $$;


-- Rättigheter för 'booking_app' (READ/WRITE)
GRANT USAGE ON SCHEMA public TO booking_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO booking_app;

GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO booking_app;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public
    GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO booking_app;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public
    GRANT USAGE, SELECT ON SEQUENCES TO booking_app;


-- Rättigheter för 'booking_readonly' (READ-ONLY)
GRANT USAGE ON SCHEMA public TO booking_readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO booking_readonly;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public
    GRANT SELECT ON TABLES TO booking_readonly;

