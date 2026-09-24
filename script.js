function isEmpty(obj) {

    if ($(obj).val() == "") {

        $(obj).addClass("is-invalid");
        $(obj).removeClass("is-valid");

        

        return true;

    } else {

        $(obj).addClass("is-valid");
        $(obj).removeClass("is-invalid");

        return false;
    }
}


$(document).ready(function () {

    $("#nextButton").click(function (e) {

        if (isEmpty("#lastName")) {
            e.preventDefault();
            return;
        }

        if (isEmpty("#firstName")) {
            e.preventDefault();
            return;
        }

        if (isEmpty("#extensionName")) {
            e.preventDefault();
            return;
        }

        if (isEmpty("#middleName")) {
            e.preventDefault();
            return;
        }

        if (isEmpty("#dateofBirth")) {
            e.preventDefault();
            return;
        }

        if (isEmpty("#placeOfBirth")) {
            e.preventDefault();
            return;
        }

        if (isEmpty("#sexatBirth")) {
            e.preventDefault();
            return;
        }

        if (isEmpty("#civilStatus")) {
            e.preventDefault();
            return;
        }

        if (isEmpty("#height")) {
            e.preventDefault();
            return;
        }

        if (isEmpty("#weight")) {
            e.preventDefault();
            return;
        }

        if (isEmpty("#bloodType")) {
            e.preventDefault();
            return;
        }

        if (isEmpty("#citizenship")) {
            e.preventDefault();
            return;
        }

        if (isEmpty("#HOUSE_BLOCK")) {
            e.preventDefault();
            return;
        }

        if (isEmpty("#STREET")) {
            e.preventDefault();
            return;
        }

        if (isEmpty("#BARANGAY")) {
            e.preventDefault();
            return;
        }

        if (isEmpty("#CITY_MUNICIPALITY")) {
            e.preventDefault();
            return;
        }

        if (isEmpty("#PROVINCE")) {
            e.preventDefault();
            return;
        }

        if (isEmpty("#PERMANENT_HOUSE_BLOCK")) {
            e.preventDefault();
            return;
        }

        if (isEmpty("#PERMANENT_STREET")) {
            e.preventDefault();
            return;
        }

        if (isEmpty("#PERMANENT_BARANGAY")) {
            e.preventDefault();
            return;
        }

        if (isEmpty("#PERMANENT_CITY_MUNICIPALITY")) {
            e.preventDefault();
            return;
        }

        if (isEmpty("#PERMANENT_PROVINCE")) {
            e.preventDefault();
            return;
        }

        if (isEmpty("#TELEPHONE_MOBILE")) {
            e.preventDefault();
            return;
        }

        if (isEmpty("#EMAIL")) {
            e.preventDefault();
            return;
        }

        });

         $("#nextButton1").click(function (e) {

        if (isEmpty("#spouseSurname")) {
            e.preventDefault();
            return;
        }

        if (isEmpty("#spouseFirstName")) {
            e.preventDefault();
            return;
        }

        if (isEmpty("#spouseNameExtension")) {
            e.preventDefault();
            return;
        }

        if (isEmpty("#spouseMiddleName")) {
            e.preventDefault();
            return;
        }

        if (isEmpty("#spouseOccupation")) {
            e.preventDefault();
            return;
        }

        if (isEmpty("#spouseEmployer")) {
            e.preventDefault();
            return;
        }

        if (isEmpty("#spouseBusinessAddress")) {
            e.preventDefault();
            return;
        }   

        if (isEmpty("#spouseTelephone")) {
            e.preventDefault();
            return;
        }

        if (isEmpty("#fatherSurname")) {
            e.preventDefault();
            return;
        }

        if (isEmpty("#fatherFirstName")) {
            e.preventDefault();
            return;
        }

        if (isEmpty("#fatherNameExtension")) {
            e.preventDefault();
            return;
        }

        if (isEmpty("#fatherMiddleName")) {
            e.preventDefault();
            return;
        }   

        if (isEmpty("#motherMaidenSurname")) {
            e.preventDefault();
            return;
        }   

        if (isEmpty("#motherFirstName")) {
            e.preventDefault();
            return;
        }   

        if (isEmpty("#motherMiddleName")) {
            e.preventDefault();
            return;
        }

        if (isEmpty("#childFullName")) {
            e.preventDefault();
            return;
        }

        if (isEmpty("#childDateOfBirth")){
            e.preventDefault();
            return;
        }

        if (isEmpty("#childPlaceOfBirth")){
            e.preventDefault();
            return;
        }

        });

         $("#submitBtn").click(function (e) {

        if(isEmpty("#elemSchoolName")){
            e.preventDefault();
            return;
        }

        if(isEmpty("#elemCourse")){
            e.preventDefault();
            return;
        }

        if(isEmpty("#elemFrom")){
            e.preventDefault();
            return;
        }

        if(isEmpty("#elemTo")){
            e.preventDefault();
            return;
        }

        if(isEmpty("#elemHighestLevel")){
            e.preventDefault();
            return;
        }

        if(isEmpty("#elemYearGraduated")){
            e.preventDefault();
            return;
        }

        if(isEmpty("#elemHonors")){
            e.preventDefault();
            return;
        }
        
        if(isEmpty("#secSchoolName")){
            e.preventDefault();
            return;
        }

        if(isEmpty("#secCourse")){
            e.preventDefault();
            return;
        }

        if(isEmpty("#secFrom")){
            e.preventDefault();
            return;
        }

        if(isEmpty("#secTo")){
            e.preventDefault();
            return;
        }

        if(isEmpty("#secHighestLevel")){
            e.preventDefault();
            return;
        }

        if(isEmpty("#secYearGraduated")){
            e.preventDefault();
            return;
        }

        if(isEmpty("#secHonors")){
            e.preventDefault();
            return;
        }   

        if(isEmpty("#vocSchoolName")){
            e.preventDefault();
            return;
        }

        if(isEmpty("#vocCourse")){  
            e.preventDefault();
            return;
        }

        if(isEmpty("#vocFrom")){
            e.preventDefault();
            return;
        }

        if(isEmpty("#vocTo")){
            e.preventDefault();
            return;
        }

        if(isEmpty("#vocHighestLevel")){
            e.preventDefault();
            return;
        }

        if(isEmpty("#vocYearGraduated")){
            e.preventDefault();
            return;
        }

        if(isEmpty("#vocHonors")){
            e.preventDefault();
            return;
        }

        if(isEmpty("#collegeSchoolName")){
            e.preventDefault();
            return;
        }

        if(isEmpty("#collegeCourse")){
            e.preventDefault();
            return;
        }   

        if(isEmpty("#collegeFrom")){
            e.preventDefault();
            return;
        }

        if(isEmpty("#collegeTo")){
            e.preventDefault();
            return;
        }

        if(isEmpty("#collegeHighestLevel")){
            e.preventDefault();
            return; 
        }

        if(isEmpty("#collegeYearGraduated")){
            e.preventDefault();
            return;
        }

        if(isEmpty("#collegeHonors")){  
            e.preventDefault();
            return;
        }

        if(isEmpty("#gradSchoolName")){
            e.preventDefault();
            return;
        }

        if(isEmpty("#gradCourse")){
            e.preventDefault();
            return;
        }

        if(isEmpty("#gradFrom")){
            e.preventDefault();
            return;
        }   

        if(isEmpty("#graduateTo")){
            e.preventDefault();
            return;
        }

        if(isEmpty("#gradHighestLevel")){
            e.preventDefault();
            return;
        }

        if(isEmpty("#gradYearGraduated")){
            e.preventDefault();
            return;
        }

        if(isEmpty("#gradHonors")){
            e.preventDefault();
            return;
        }

        alert("Form submitted successfully!");

        });
    
});

$(document).ready(function() {

    $("#sameAsResidential").change(function(e) {

        if (this.checked) {

            $("#PERMANENT_HOUSE_BLOCK").val($("#HOUSE_BLOCK").val());
            $("#PERMANENT_STREET").val($("#STREET").val());
            $("#PERMANENT_SUBDIVISION").val($("#SUBDIVISION").val());
            $("#PERMANENT_BARANGAY").val($("#BARANGAY").val());
            $("#PERMANENT_CITY_MUNICIPALITY").val($("#CITY_MUNICIPALITY").val());
            $("#PERMANENT_PROVINCE").val($("#PROVINCE").val());

            $("#PERMANENT_HOUSE_BLOCK").prop("disabled", true);
            $("#PERMANENT_STREET").prop("disabled", true);
            $("#PERMANENT_SUBDIVISION").prop("disabled", true);
            $("#PERMANENT_BARANGAY").prop("disabled", true);
            $("#PERMANENT_CITY_MUNICIPALITY").prop("disabled", true);
            $("#PERMANENT_PROVINCE").prop("disabled", true);

        } else {

            $("#PERMANENT_HOUSE_BLOCK").prop("disabled", false);
            $("#PERMANENT_STREET").prop("disabled", false);
            $("#PERMANENT_SUBDIVISION").prop("disabled", false);
            $("#PERMANENT_BARANGAY").prop("disabled", false);
            $("#PERMANENT_CITY_MUNICIPALITY").prop("disabled", false);
            $("#PERMANENT_PROVINCE").prop("disabled", false);

            $("#PERMANENT_HOUSE_BLOCK").val("");
            $("#PERMANENT_STREET").val("");
            $("#PERMANENT_SUBDIVISION").val("");
            $("#PERMANENT_BARANGAY").val("");
            $("#PERMANENT_CITY_MUNICIPALITY").val("");
            $("#PERMANENT_PROVINCE").val("");
        }
    });

    $("#noSpouse").change(function(e) {

        if (this.checked) {

            $("#spouseSurname").val("");
            $("#spouseFirstName").val("");
            $("#spouseNameExtension").val("");
            $("#spouseMiddleName").val("");
            $("#spouseOccupation").val("");
            $("#spouseEmployer").val("");
            $("#spouseBusinessAddress").val("");
            $("#spouseTelephone").val("");

            $("#spouseSurname").prop("disabled", true);
            $("#spouseFirstName").prop("disabled", true);
            $("#spouseNameExtension").prop("disabled", true);
            $("#spouseMiddleName").prop("disabled", true);
            $("#spouseOccupation").prop("disabled", true);
            $("#spouseEmployer").prop("disabled", true);
            $("#spouseBusinessAddress").prop("disabled", true);
            $("#spouseTelephone").prop("disabled", true);

        } else {

            $("#spouseSurname").prop("disabled", false);
            $("#spouseFirstName").prop("disabled", false);
            $("#spouseNameExtension").prop("disabled", false);
            $("#spouseMiddleName").prop("disabled", false);
            $("#spouseOccupation").prop("disabled", false);
            $("#spouseEmployer").prop("disabled", false);
            $("#spouseBusinessAddress").prop("disabled", false);
            $("#spouseTelephone").prop("disabled", false);

            $("#spouseSurname").val("");
            $("#spouseFirstName").val("");
            $("#spouseNameExtension").val("");
            $("#spouseMiddleName").val("");
            $("#spouseOccupation").val("");
            $("#spouseEmployer").val("");
            $("#spouseBusinessAddress").val("");
            $("#spouseTelephone").val("");
        }
    });

    $("#noChildren").change(function(e) {

        if (this.checked) {

            $("#childFullName").val("");
            $("#childDateOfBirth").val("");

            $("#childFullName").prop("disabled", true);
            $("#childDateOfBirth").prop("disabled", true);

        } else {

            $("#childFullName").prop("disabled", false);
            $("#childDateOfBirth").prop("disabled", false);

            $("#childFullName").val("");
            $("#childDateOfBirth").val("");

        }
    });
});

$("#citizenship").change(function () {

    if ($(this).val() == "dual") {

        $("#dualCitizenshipFields").prop("hidden", false);

    } else {

        $("#dualCitizenshipFields").prop("hidden", true);

        $("#dualCitizenshipType").val("");
        $("#foreignCountry").val("");

    }

});
