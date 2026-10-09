<?php

require_once __DIR__ . "/database/database.php";

class PdsRecordNotFoundException extends RuntimeException
{
}

function pdsFieldMaps()
{
    return array(
        "personal" => array(
            "table" => "personal_information",
            "fields" => array(
                "lastName" => "last_name",
                "firstName" => "first_name",
                "extensionName" => "extension_name",
                "middleName" => "middle_name",
                "dateofBirth" => "date_of_birth",
                "placeOfBirth" => "place_of_birth",
                "sexatBirth" => "sex_at_birth",
                "civilStatus" => "civil_status",
                "height" => "height",
                "weight" => "weight",
                "bloodType" => "blood_type",
                "UMID" => "umid_no",
                "Pagibig" => "pagibig_no",
                "PHILHEALTH" => "philhealth_no",
                "PHILSYS" => "philsys_no",
                "TIN" => "tin_no",
                "AGENCY_EMPLOYEE" => "agency_employee_no",
                "citizenship" => "citizenship",
                "dualCitizenshipType" => "dual_citizenship_type",
                "foreignCountry" => "foreign_country",
                "HOUSE_BLOCK" => "house_block",
                "STREET" => "street",
                "SUBDIVISION" => "subdivision",
                "BARANGAY" => "barangay",
                "CITY_MUNICIPALITY" => "city_municipality",
                "PROVINCE" => "province",
                "PERMANENT_HOUSE_BLOCK" => "permanent_house_block",
                "PERMANENT_STREET" => "permanent_street",
                "PERMANENT_SUBDIVISION" => "permanent_subdivision",
                "PERMANENT_BARANGAY" => "permanent_barangay",
                "PERMANENT_CITY_MUNICIPALITY" => "permanent_city_municipality",
                "PERMANENT_PROVINCE" => "permanent_province",
                "TELEPHONE_MOBILE" => "telephone_mobile",
                "EMAIL" => "email"
            )
        ),
        "family" => array(
            "table" => "family",
            "fields" => array(
                "spouseSurname" => "spouse_surname",
                "spouseFirstName" => "spouse_first_name",
                "spouseNameExtension" => "spouse_name_extension",
                "spouseMiddleName" => "spouse_middle_name",
                "spouseOccupation" => "spouse_occupation",
                "spouseEmployer" => "spouse_employer",
                "spouseBusinessAddress" => "spouse_business_address",
                "spouseTelephone" => "spouse_telephone",
                "fatherSurname" => "father_surname",
                "fatherFirstName" => "father_first_name",
                "fatherNameExtension" => "father_name_extension",
                "fatherMiddleName" => "father_middle_name",
                "motherMaidenSurname" => "mother_maiden_surname",
                "motherFirstName" => "mother_first_name",
                "motherMiddleName" => "mother_middle_name",
                "noSpouse" => "no_spouse",
                "noChildren" => "no_children"
            )
        ),
        "education" => array(
            "table" => "education",
            "fields" => array(
                "elemSchoolName" => "elem_school_name",
                "elemCourse" => "elem_course",
                "elemFrom" => "elem_from",
                "elemTo" => "elem_to",
                "elemHighestLevel" => "elem_highest_level",
                "elemYearGraduated" => "elem_year_graduated",
                "elemHonors" => "elem_honors",
                "secSchoolName" => "sec_school_name",
                "secCourse" => "sec_course",
                "secFrom" => "sec_from",
                "secTo" => "sec_to",
                "secHighestLevel" => "sec_highest_level",
                "secYearGraduated" => "sec_year_graduated",
                "secHonors" => "sec_honors",
                "vocSchoolName" => "voc_school_name",
                "vocCourse" => "voc_course",
                "vocFrom" => "voc_from",
                "vocTo" => "voc_to",
                "vocHighestLevel" => "voc_highest_level",
                "vocYearGraduated" => "voc_year_graduated",
                "vocHonors" => "voc_honors",
                "collegeSchoolName" => "college_school_name",
                "collegeCourse" => "college_course",
                "collegeFrom" => "college_from",
                "collegeTo" => "college_to",
                "collegeHighestLevel" => "college_highest_level",
                "collegeYearGraduated" => "college_year_graduated",
                "collegeHonors" => "college_honors",
                "gradSchoolName" => "grad_school_name",
                "gradCourse" => "grad_course",
                "gradFrom" => "grad_from",
                "gradTo" => "grad_to",
                "gradHighestLevel" => "grad_highest_level",
                "gradYearGraduated" => "grad_year_graduated",
                "gradHonors" => "grad_honors"
            )
        )
    );
}

function pdsValidId($value)
{
    return filter_var($value, FILTER_VALIDATE_INT, array("options" => array("min_range" => 1)));
}

function pdsReadRecord($id)
{
    global $conn;
    $maps = pdsFieldMaps();
    $record = array("id" => (int) $id, "data" => array());

    $statement = $conn->prepare("SELECT id FROM pds_records WHERE id = ?");
    $statement->bind_param("i", $id);
    $statement->execute();
    $exists = $statement->get_result()->num_rows > 0;
    $statement->close();

    if (!$exists) {
        return null;
    }

    foreach ($maps as $section => $config) {
        $columns = array_values($config["fields"]);
        $statement = $conn->prepare(
            "SELECT " . implode(", ", $columns) . " FROM " . $config["table"] . " WHERE pds_id = ?"
        );
        $statement->bind_param("i", $id);
        $statement->execute();
        $row = $statement->get_result()->fetch_assoc();
        $statement->close();
        $record["data"][$section] = array();

        if ($row) {
            foreach ($config["fields"] as $fieldId => $column) {
                $record["data"][$section][$fieldId] = $row[$column];
            }
        }
    }

    $statement = $conn->prepare("SELECT full_name, date_of_birth FROM pds_children WHERE pds_id = ? ORDER BY id");
    $statement->bind_param("i", $id);
    $statement->execute();
    $children = $statement->get_result();
    $record["data"]["family"]["children"] = array();
    while ($child = $children->fetch_assoc()) {
        $record["data"]["family"]["children"][] = array(
            "fullName" => $child["full_name"],
            "dateOfBirth" => $child["date_of_birth"]
        );
    }
    $statement->close();

    return $record;
}

function pdsSaveSection($section, $values, $recordId = null, $updateOnly = false)
{
    global $conn;
    $maps = pdsFieldMaps();
    if (!isset($maps[$section]) || !is_array($values)) {
        throw new InvalidArgumentException("A valid section and form data are required.");
    }

    $id = $recordId === null || $recordId === "" ? null : pdsValidId($recordId);
    if ($recordId !== null && $recordId !== "" && !$id) {
        throw new InvalidArgumentException("A valid PDS record ID is required.");
    }
    if ($updateOnly && $id === null) {
        throw new InvalidArgumentException("A PDS record ID is required for updates.");
    }

    $displayName = "Untitled PDS";
    if ($section === "personal") {
        $displayName = trim(
            (isset($values["firstName"]) ? $values["firstName"] : "") . " " .
            (isset($values["lastName"]) ? $values["lastName"] : "")
        );
        if ($displayName === "") {
            $displayName = "Untitled PDS";
        }
    }

    $conn->begin_transaction();
    try {
        if ($id === null) {
            $statement = $conn->prepare("INSERT INTO pds_records (display_name) VALUES (?)");
            $statement->bind_param("s", $displayName);
            $statement->execute();
            $id = $conn->insert_id;
            $statement->close();
        } else {
            $statement = $conn->prepare("SELECT id FROM pds_records WHERE id = ?");
            $statement->bind_param("i", $id);
            $statement->execute();
            $exists = $statement->get_result()->num_rows > 0;
            $statement->close();
            if (!$exists) {
                throw new PdsRecordNotFoundException("PDS record not found.");
            }
        }

        if ($section === "personal") {
            $statement = $conn->prepare("UPDATE pds_records SET display_name = ? WHERE id = ?");
            $statement->bind_param("si", $displayName, $id);
            $statement->execute();
            $statement->close();
        }

        $config = $maps[$section];
        $columns = array_values($config["fields"]);
        $insertColumns = array_merge(array("pds_id"), $columns);
        $placeholders = implode(", ", array_fill(0, count($insertColumns), "?"));
        $updates = array();
        foreach ($columns as $column) {
            $updates[] = $column . " = VALUES(" . $column . ")";
        }
        $sql = "INSERT INTO " . $config["table"] . " (" . implode(", ", $insertColumns) .
            ") VALUES (" . $placeholders . ") ON DUPLICATE KEY UPDATE " . implode(", ", $updates);
        $statement = $conn->prepare($sql);

        $parameters = array($id);
        $types = "i";
        foreach ($config["fields"] as $fieldId => $column) {
            $value = isset($values[$fieldId]) ? $values[$fieldId] : null;
            if ($fieldId === "noSpouse" || $fieldId === "noChildren") {
                $value = empty($value) ? 0 : 1;
            } elseif ($value === "") {
                $value = null;
            } elseif ($value !== null) {
                $value = (string) $value;
            }
            $parameters[] = $value;
            $types .= "s";
        }

        $bindValues = array($types);
        foreach ($parameters as $index => $value) {
            $bindValues[] = &$parameters[$index];
        }
        call_user_func_array(array($statement, "bind_param"), $bindValues);
        $statement->execute();
        $statement->close();

        if ($section === "family") {
            $statement = $conn->prepare("DELETE FROM pds_children WHERE pds_id = ?");
            $statement->bind_param("i", $id);
            $statement->execute();
            $statement->close();

            $children = isset($values["children"]) && is_array($values["children"]) ? $values["children"] : array();
            $statement = $conn->prepare(
                "INSERT INTO pds_children (pds_id, full_name, date_of_birth) VALUES (?, ?, ?)"
            );
            foreach ($children as $child) {
                $name = isset($child["fullName"]) ? trim($child["fullName"]) : "";
                $dateOfBirth = isset($child["dateOfBirth"]) && $child["dateOfBirth"] !== ""
                    ? $child["dateOfBirth"] : null;
                if ($name === "" && $dateOfBirth === null) {
                    continue;
                }
                $statement->bind_param("iss", $id, $name, $dateOfBirth);
                $statement->execute();
            }
            $statement->close();
        }

        $conn->commit();
        return (int) $id;
    } catch (Throwable $error) {
        $conn->rollback();
        throw $error;
    }
}

function pdsDeleteRecord($id)
{
    global $conn;
    $id = pdsValidId($id);
    if (!$id) {
        throw new InvalidArgumentException("A valid PDS record ID is required.");
    }

    $statement = $conn->prepare("DELETE FROM pds_records WHERE id = ?");
    $statement->bind_param("i", $id);
    $statement->execute();
    $deleted = $statement->affected_rows;
    $statement->close();

    return $deleted > 0;
}

function pdsJsonResponse($status, $payload)
{
    http_response_code($status);
    header("Content-Type: application/json; charset=utf-8");
    echo json_encode($payload);
    exit;
}
