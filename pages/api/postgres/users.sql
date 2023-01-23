CREATE TABLE public.users
(
    user_id text,
    name text NOT NULL,
    email text,
    age int,
    family text,
    friend text,
    colleague text,
    ratingtype text,
    PRIMARY KEY(user_id)
);