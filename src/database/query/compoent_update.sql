DROP PROCEDURE IF EXISTS set_component_status;
CREATE PROCEDURE set_component_status(
    IN p_componentId INT,
    IN p_status ENUM ('on','off')
)
BEGIN
    UPDATE tbl_greenhouse_component
    SET status = p_status
    WHERE id = p_componentId;
END;