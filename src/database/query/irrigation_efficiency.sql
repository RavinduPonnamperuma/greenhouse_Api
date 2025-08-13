DROP PROCEDURE sp_irrigation_efficiency;
CREATE PROCEDURE sp_irrigation_efficiency(
    IN startDate DATE,
    IN endDate DATE,
    IN polytunnelCode VARCHAR(50)
)
BEGIN
    SELECT pt.code,
           SUM(i.waterPerDay)      AS total_water,
           SUM(i.fertilizerPerDay) AS total_fertilizer,
           COUNT(isched.id)        AS completed_tasks
    FROM tbl_polytunnel pt
             JOIN tbl_plant p ON pt.id = p.polytunnelId
             JOIN tbl_irrigation i ON p.id = i.plantId
             JOIN tbl_irrigation_schedule isched ON i.id = isched.irrigationId
    WHERE isched.isCompleted = 1
      AND isched.scheduledDate BETWEEN startDate AND endDate
      AND (pt.code = polytunnelCode OR polytunnelCode IS NULL)
    GROUP BY pt.code;
END;
