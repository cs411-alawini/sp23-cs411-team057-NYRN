CREATE DEFINER=`root`@`%` PROCEDURE `bestVal`()
BEGIN
    DECLARE done BOOLEAN DEFAULT FALSE;
    DECLARE curr_game VARCHAR(250);
    DECLARE curr_critic INT;
    DECLARE curr_price FLOAT;
    DECLARE curr_upvote INT;
    DECLARE curr_popularity VARCHAR(100);
    DECLARE curr_playtime INT DEFAULT 0;
    DECLARE curr_isFave VARCHAR(30);
    DECLARE g_cursor CURSOR FOR SELECT DISTINCT QueryName, MetaCritic, PriceFinal, RecommendationCount, '-'  
								FROM GameFinder.Games NATURAL JOIN 
                                (SELECT DISTINCT game_id,COUNT(game_id) AS cG FROM GameFinder.likes GROUP BY game_id HAVING cG>10) AS T 
                                WHERE Metacritic >90 AND PriceFinal <15.00
                                UNION
                                SELECT DISTINCT QueryName, MetaCritic, PriceFinal, RecommendationCount, 'Site Favorite'  
								FROM (SELECT * FROM GameFinder.Games WHERE QueryID IN (SELECT g_id FROM gf_fan_fave)) AS fanFave NATURAL JOIN 
                                (SELECT DISTINCT game_id,COUNT(game_id) AS cG FROM GameFinder.likes GROUP BY game_id HAVING cG>10) AS T 
                                WHERE fanFave.PriceFinal <15.00;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    DROP TABLE IF EXISTS bestValGames;
    CREATE TABLE bestValGames(
		game_name VARCHAR(250),
        critic_score INT,
        price FLOAT,
        popularity VARCHAR(100),
        play_time INT,
        is_fave VARCHAR(30)
    );
    
    OPEN g_cursor;
	read_loop: LOOP
    FETCH g_cursor INTO curr_game,curr_critic,curr_price,curr_upvote,curr_isFave;
    
	IF done THEN
      LEAVE read_loop;
    END IF;
    
    IF curr_upvote <= 1000 THEN
		SET curr_popularity = "Underrated";
	ELSEIF curr_upvote > 1000 AND curr_upvote <= 5000 THEN
		SET curr_popularity = "Popular";
	ELSEIF curr_upvote > 5000 AND curr_upvote <= 10000 THEN
		SET curr_popularity = "Fan Favourite";
	ELSEIF curr_upvote > 10000 AND curr_upvote <= 50000 THEN
		SET curr_popularity = "Masterpiece";
	ELSE
		SET curr_popularity = "Legendary";
	END IF;
	
    SET curr_playtime = (SELECT AVG(Hours) FROM Purchases WHERE Name LIKE curr_game);
    IF (curr_playtime IS NULL) THEN
		SET curr_playtime = 0;
	END IF;
    
    INSERT IGNORE INTO bestValGames VALUE(curr_game,curr_critic,curr_price,curr_popularity, curr_playtime, curr_isFave);
    END LOOP;
    
    
    CLOSE g_cursor;
    
    SELECT * FROM bestValGames ORDER BY game_name;
    
	END
