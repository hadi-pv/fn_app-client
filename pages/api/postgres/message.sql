CREATE TABLE public.message
(
    id text,
    fk_news_id text NOT NULL,
    send_by text,
    send_to text,
    CONSTRAINT fk_by_user
        FOREIGN KEY(send_by)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);