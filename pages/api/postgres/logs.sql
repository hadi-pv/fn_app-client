CREATE TABLE public.logs
(
    id text,
    user_id text NOT NULL,
    news_id text NOT NULL,
    task text NOT NULL,
    send_to text,
    time_in_sec int NOT NULL
);