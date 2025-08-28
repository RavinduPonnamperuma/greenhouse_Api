DROP PROCEDURE IF EXISTS sp_schedule_run;
CREATE PROCEDURE sp_schedule_run(
)
BEGIN
    SELECT
        s.id,
        s.scheduledDate,
        s.scheduledTime,
        s.taskType,
        s.duration,
        s.isCompleted,
        p.id AS plantId,
        p.plantName AS plantName,
        i.waterPerDay,
        i.isEvening,
        i.isMorning,
        i.fertilizerPerDay,
        pt.id AS polytunnelId,
        pt.code AS polytunnelCode,
        JSON_ARRAYAGG(
                JSON_OBJECT(
                        'componentId', gc.id,
                        'componentName', gc.name,
                        'componentStatus', gc.status
                )
        ) AS components
    FROM tbl_irrigation_schedule s
             LEFT JOIN tbl_plant p ON s.plantId = p.id
             LEFT JOIN tbl_irrigation i ON s.irrigationId = i.id
             LEFT JOIN tbl_polytunnel pt ON p.polytunnelId = pt.id
             LEFT JOIN tbl_greenhouse_component gc ON pt.id = gc.polytunnelId
    WHERE s.scheduledDate = '2025-08-16'
      AND s.isCompleted = 0
    GROUP BY s.id, s.scheduledDate, s.scheduledTime, s.taskType, s.duration, s.isCompleted,
             p.id, p.plantName, i.waterPerDay, i.isEvening, i.isMorning, i.fertilizerPerDay,
             pt.id, pt.code
    ORDER BY s.scheduledTime DESC;


END;
