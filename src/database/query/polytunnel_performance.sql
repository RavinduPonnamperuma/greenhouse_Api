DROP PROCEDURE IF EXISTS sp_polytunnel_performance;
CREATE PROCEDURE sp_polytunnel_performance(
    IN startDate DATE,
    IN endDate DATE,
    IN polytunnelCode VARCHAR(50)
)
BEGIN
    SELECT pt.code,
           pt.location,
           SUM(h.quantity)                  AS total_yield,
           SUM(h.quantity * h.sellingPrice) AS revenue
    FROM tbl_polytunnel pt
             LEFT JOIN tbl_plant p ON pt.id = p.polytunnelId
             LEFT JOIN tbl_harvest h ON p.id = h.plantId
    WHERE h.harvestDate BETWEEN startDate AND endDate
      AND (pt.code = polytunnelCode OR polytunnelCode IS NULL)
    GROUP BY pt.id, pt.code, pt.location;
END;
