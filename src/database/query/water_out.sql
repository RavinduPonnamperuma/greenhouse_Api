DROP PROCEDURE IF EXISTS use_water_fixed;
CREATE PROCEDURE use_water_fixed(
    IN p_waterTankId INT
)
BEGIN

    DECLARE v_outCapacity DECIMAL(10, 2);

    -- Fixed amount to deduct
    SET v_outCapacity = 2.0;

    -- Deduct from tank
    UPDATE tbl_water_tank
    SET capacity = capacity - v_outCapacity
    WHERE id = p_waterTankId;

    -- Insert history
    INSERT INTO tbl_water_tank_history (outDate, outCapacity, note, waterTankId)
    VALUES (NOW(), v_outCapacity, 'Auto water usage', p_waterTankId);

END