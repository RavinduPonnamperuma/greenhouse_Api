DROP PROCEDURE IF EXISTS get_dashboard_metrics;
CREATE PROCEDURE get_dashboard_metrics()
BEGIN
    SELECT
        -- Plants planted this month
        (SELECT COUNT(*)
         FROM tbl_plant
         WHERE status = 'Planted'
           AND YEAR(startDate) = YEAR(CURDATE())
           AND MONTH(startDate) = MONTH(CURDATE()))   AS growingPlants,

        -- Distinct plants harvested this month
        (SELECT COUNT(*)
         FROM tbl_plant
         WHERE status = 'Dead'
           AND YEAR(startDate) = YEAR(CURDATE())
           AND MONTH(startDate) = MONTH(CURDATE()))  AS harvestedPlants,

        -- Total income this month
        (SELECT IFNULL(SUM(sellingPrice * quantity), 0)
         FROM tbl_harvest
         WHERE YEAR(harvestDate) = YEAR(CURDATE())
           AND MONTH(harvestDate) = MONTH(CURDATE())) AS totalIncome;
END;
