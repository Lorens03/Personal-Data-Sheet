$(document).ready(function () {

    $("#noSpouse").change(function (e) {

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
    
});

function refreshChildrenState() {
    if ($("#noChildren").is(":checked")) {
        $(".child-field").prop("disabled", true);
    } else {
        $(".child-field").prop("disabled", false);
    }

}

if (noChildren) {
    $(noChildren).change(function () {
        refreshChildrenState();
    });
}

if (addChildBtn && childrenContainer) {

    $(addChildBtn).click(function () {

        const index = $(childrenContainer).find(".child-entry").length + 1;

        const newEntry = $(`
            <div class="child-entry row mb-3">

                <div class="col-md-5">
                    <div class="mb-3">

                        <label for="childFullName_${index}" class="form-label">
                            FULL NAME OF CHILDREN
                        </label>

                        <input type="text"
                               class="form-control child-field"
                               id="childFullName_${index}">

                    </div>
                </div>

                <div class="col-md-5">
                    <div class="mb-3">

                        <label for="childDateOfBirth_${index}" class="form-label">
                            DATE OF BIRTH
                        </label>

                        <input type="date"
                               class="form-control child-field"
                               id="childDateOfBirth_${index}">

                    </div>
                </div>

                <div class="col-md-2 d-flex align-items-end justify-content-end">

                    <button type="button"
                            class="btn btn-outline-danger btn-sm remove-child"
                            aria-label="Remove child">

                        ×

                    </button>

                </div>

            </div>
        `);


        if ($(noChildren).is(":checked")) {

            newEntry.find(".child-field").prop("disabled", true);

        }


        $(childrenContainer).append(newEntry);

    });

}


$(document).on("click", ".remove-child", function () {

    const entry = $(this).closest(".child-entry");

    if (entry.length && !entry.data("base")) {

        entry.remove();

    }

});