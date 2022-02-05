-- Create a test user
INSERT INTO auth.users(id, email) VALUES ('a3750835-d467-4aca-b643-cabc77632948', 'test2@test.com');

-- Create a test demo
INSERT INTO "Demos"(demo_slug, content, title, user_id, til_link, is_published) VALUES ('test', '# Test\nHello World!', 'Test', 'a3750835-d467-4aca-b643-cabc77632948', '/test', true);
