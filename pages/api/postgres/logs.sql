CREATE TABLE public.logs
(
    id text,
    news_id text NOT NULL,
    user_id text NOT NULL,
    task text NOT NULL,
    rt text NOT NULL,
    send_to text,
    close_from text,
    time_in_sec int NOT NULL,
    add_info text
);


/* 
    Task numbers:

    rt type:000
        task 10:send
        task 11:close
    rt type:111
        task 20:send
        task 21:close from modal 1
        task 22:close from modal 2
        task 23:close from modal 3
    rt type:222
        task 30:send
        task 31:close from modal 1
        task 32:close from modal 2
    rt type:333
        task 30:send
        task 31:close from modal 1
        task 32:close from modal 2
        task 33:close from modal 3

    task 40 : end of the experiment
*/

