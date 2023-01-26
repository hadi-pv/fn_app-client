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
    PRIMARY KEY(user_id)
);