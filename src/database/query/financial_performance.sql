DROP PROCEDURE sp_financial_performance;
CREATE PROCEDURE sp_financial_performance(
    IN startDate DATE,
    IN endDate DATE,
    IN polytunnelCode VARCHAR(50)
)
BEGIN
    SELECT pt.code,
           pt.location,
           SUM(h.quantity * h.sellingPrice)                 AS total_revenue,
           SUM(p.cost)                                      AS total_cost,
           (SUM(h.quantity * h.sellingPrice) - SUM(p.cost)) AS profit
    FROM tbl_polytunnel pt
             JOIN tbl_plant p ON pt.id = p.polytunnelId
             JOIN tbl_harvest h ON p.id = h.plantId
    WHERE h.harvestDate BETWEEN startDate AND endDate
      AND (pt.code = polytunnelCode OR polytunnelCode IS NULL)
    GROUP BY pt.id;
END;