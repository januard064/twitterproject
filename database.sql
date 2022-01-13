CREATE DATABASE twitter;

CREATE TABLE usertwitter(
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(225),
    password VARCHAR(225)
);

CREATE TABLE tweet(
    tweet_id SERIAL PRIMARY KEY,
    tweets VARCHAR(225),
    tweets_time DATE NOT NULL,
    tweet_name VARCHAR(225),
    tweet_email VARCHAR(225)
)