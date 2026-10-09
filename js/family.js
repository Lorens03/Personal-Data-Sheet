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
            $(".spouse-field").removeClass("is-invalid is-valid");

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
            $(".spouse-field").removeClass("is-invalid is-valid");
        }
    });
    
});

function refreshChildrenState() {
    const noChildrenSelected = $("#noChildren").is(":checked");
    $(".child-field")
        .prop("disabled", noChildrenSelected)
        .removeClass("is-invalid is-valid");

    if (noChildrenSelected) {
        $(".child-field").val("");
    }

    $("#addChildBtn").prop("disabled", noChildrenSelected);
}

$(document).ready(function () {
    $("#noChildren").on("change", refreshChildrenState);
    refreshChildrenState();

    $("#addChildBtn").on("click", function () {
        const childrenContainer = $("#childrenContainer");
        if (!childrenContainer.length || $("#noChildren").is(":checked")) {
            return;
        }

        const index = childrenContainer.find(".child-entry").length + 1;

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


        childrenContainer.append(newEntry);

    });

});


$(document).on("click", ".remove-child", function () {

    const entry = $(this).closest(".child-entry");

    if (entry.length && !entry.data("base")) {

        entry.remove();

    }

});