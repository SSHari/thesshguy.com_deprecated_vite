-- This script was generated by the Schema Diff utility in pgAdmin 4
-- For the circular dependencies, the order in which Schema Diff writes the objects is not very sophisticated
-- and may require manual changes to the script to ensure changes are applied in the correct order.
-- Please report an issue for any failure with the reproduction steps.

CREATE TABLE IF NOT EXISTS public."Demos"
(
    demo_id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    content text COLLATE pg_catalog."default" NOT NULL,
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    title text COLLATE pg_catalog."default" NOT NULL,
    demo_slug text COLLATE pg_catalog."default" NOT NULL,
    user_id uuid NOT NULL,
    is_published boolean NOT NULL DEFAULT false,
    til_link text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Demos_pkey" PRIMARY KEY (demo_id),
    CONSTRAINT "Demos_content_slug_key" UNIQUE (demo_slug),
    CONSTRAINT "Demos_user_id_fkey" FOREIGN KEY (user_id)
        REFERENCES auth.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Demos"
    OWNER to supabase_admin;

ALTER TABLE IF EXISTS public."Demos"
    ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE public."Demos" TO anon;

GRANT ALL ON TABLE public."Demos" TO authenticated;

GRANT ALL ON TABLE public."Demos" TO postgres;

GRANT ALL ON TABLE public."Demos" TO service_role;

GRANT ALL ON TABLE public."Demos" TO supabase_admin;

COMMENT ON TABLE public."Demos"
    IS 'MDX for demos related to TILs';

COMMENT ON COLUMN public."Demos".til_link
    IS 'Path to Github TIL Entry';
CREATE POLICY "Enable read access to all users"
    ON public."Demos"
    AS PERMISSIVE
    FOR SELECT
    TO public
    USING ((is_published = true));