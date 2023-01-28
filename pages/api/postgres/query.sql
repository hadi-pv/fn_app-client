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



bb13f7eb-2930-48ca-a843-cc49861bf931	12	01d3c547-fcab-411c-a42d-876f92d388b6	friend	13
2a634be6-210b-4089-ab16-58975f1a50c0	1	01d3c547-fcab-411c-a42d-876f92d388b6	colleague	7
773cb2bc-3784-449a-b76d-70c07727a79a	4	01d3c547-fcab-411c-a42d-876f92d388b6	friend	4
2cb99c58-3b7c-4e8b-a99c-5ff47232f388	4	01d3c547-fcab-411c-a42d-876f92d388b6	family	6



0f733a58-5ab1-4755-afe9-7f36baee2ab9	15	01d3c547-fcab-411c-a42d-876f92d388b6	21	222	lsn		1	8	
ba67a069-bbbe-4d09-b39e-89daff8aae1b	14	01d3c547-fcab-411c-a42d-876f92d388b6	21	222	lsn		1	4	
896d7eaa-49e4-4282-a9f4-0aa8f485497d	4	01d3c547-fcab-411c-a42d-876f92d388b6	21	222	lsn		1	1	
22ca4e8e-31f1-4079-86f8-62cc20f69936	1	01d3c547-fcab-411c-a42d-876f92d388b6	21	222	lsn		1	2	
a4ef7e4a-d221-46e0-b9a0-512cf1af978e	6	01d3c547-fcab-411c-a42d-876f92d388b6	21	222	lsn		1	2	
adc5cb6c-fc34-460d-abd6-36ae537e03a0	12	01d3c547-fcab-411c-a42d-876f92d388b6	20	222	lsn	friend		13	
573819fe-e5bb-4b21-bc8b-1657463e0608	1	01d3c547-fcab-411c-a42d-876f92d388b6	20	222	lsn	colleague		7	
a0a6f597-08e0-4be1-b8ea-58d9b666c598	4	01d3c547-fcab-411c-a42d-876f92d388b6	20	222	lsn	friend		4	
64d70bd6-b20c-4c1b-8be7-ded7ce2ff39b	4	01d3c547-fcab-411c-a42d-876f92d388b6	20	222	lsn	family		6	
c8801ca3-9c29-4322-abb4-aea20ca58c07	0	01d3c547-fcab-411c-a42d-876f92d388b6	40	222	lsn			184	Interacted with 9


01d3c547-fcab-411c-a42d-876f92d388b6	Saji	55	Male	Malyalam	Kerala  Others	Social Science	Servicr	WhatsApp,WhatsApp,Facebook,WhatsApp,WhatsApp	{"1":"WhatsApp","2":"Facebook","3":"Twitter"}	1-2 hours	Yes	Rarely	English	saji@iitm.ac.in	Famil	Frien	Cet	222	lsn