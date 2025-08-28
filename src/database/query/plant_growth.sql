DROP PROCEDURE IF EXISTS sp_plant_growth;
CREATE PROCEDURE sp_plant_growth(
    IN startDate DATE,
    IN endDate DATE,
    IN plantName VARCHAR(50)
)
BEGIN
    SELECT p.plantName,
           h.variety,
           AVG(h.quantity)                  AS avg_yield,
           SUM(h.sellingPrice * h.quantity) AS total_revenue
    FROM tbl_plant p
             JOIN tbl_harvest h ON p.id = h.plantId
    WHERE h.harvestDate BETWEEN startDate AND endDate
      AND (p.plantName = plantName OR plantName IS NULL)
    GROUP BY p.plantName, h.variety;
END;
