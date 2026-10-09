<?php

require_once __DIR__ . "/pds_crud.php";

try {
    if ($_SERVER["REQUEST_METHOD"] !== "POST") {
        header("Allow: POST");
        pdsJsonResponse(405, array("error" => "Method not allowed."));
    }

    $request = json_decode(file_get_contents("php://input"), true);
    if (!is_array($request)) {
        pdsJsonResponse(400, array("error" => "A valid JSON request is required."));
    }

    $id = pdsSaveSection(
        isset($request["section"]) ? $request["section"] : "",
        isset($request["values"]) ? $request["values"] : null
    );
    pdsJsonResponse(201, array("id" => $id, "message" => "PDS record saved."));
} catch (InvalidArgumentException $error) {
    pdsJsonResponse(400, array("error" => $error->getMessage()));
} catch (Throwable $error) {
    error_log($error->getMessage());
    pdsJsonResponse(500, array("error" => "Could not save the PDS record. Check the XAMPP PHP error log and database setup."));
}
