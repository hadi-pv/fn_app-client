CREATE TABLE public.users
(
    user_id text,
    name text NOT NULL,
    age int,
    gender text,
    motherTongue text,
    homeState text,
    educationalQualification text,
    educationalBackground text,
    occupation text,
    socialMediaUsage text[],
    socialMediaUsageOrder json,
    socialMediaUsageTime text,
    isWhatsappGroupMember text,
    whatsappUsageFrequencyForNews text,
    prefferedLanguageOnSocialMedia text,
    email text,
    family text,
    friend text,
    colleague text,
    ratingtype text,
    newstype text,
    PRIMARY KEY(user_id)
);

CREATE TABLE public.message
(
    id text,
    fk_news_id text NOT NULL,
    send_by text,
    send_to text,
    timetaken int,
    CONSTRAINT fk_by_user
        FOREIGN KEY(send_by)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);

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
