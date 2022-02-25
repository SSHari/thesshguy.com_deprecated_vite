-- Create a test user
INSERT INTO auth.users(id, email) VALUES ('a3750835-d467-4aca-b643-cabc77632948', 'test2@test.com');

-- Create a test demo
INSERT INTO "Demos"(demo_slug, content, title, user_id, til_link, is_published) VALUES ('demo-test', '# Hello Demo!', 'Demo Test', 'a3750835-d467-4aca-b643-cabc77632948', '/test', true);

-- Create a test blog
INSERT INTO "Blogs"(blog_slug, content, title, user_id, is_published) VALUES ('demo-blog', '# Hello Blog!', 'Blog Test', 'a3750835-d467-4aca-b643-cabc77632948', true);
