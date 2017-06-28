demoRestartApp.factory("DataService",
    function ($http) {
        var getStates = function () {
            return $http.get("api/State");
        };

        var getState = function (stateId) {
            return $http.get("api/State/" + stateId);
        };

        var addState = function (state) {
            return $http.post("api/State", state)
        };

        var editState = function (state) {
            return $http.put("api/State/" + state.id, state)
        };

        var deleteState = function (stateId) {
            return $http.delete("api/State/" + stateId)
        };
        //--------------
        var getCategories = function () {
            return $http.get("api/Categories");
        };

        var getCategory = function (categoryId) {
            return $http.get("api/Categories/" + categoryId);
        };

        var addCategory = function (category) {
            return $http.post("api/Categories", category)
        };

        var editCategory = function (category) {
            return $http.put("api/Categories/" + category.categoryID, category)
        };

        var deleteCategory = function (categoryId) {
            return $http.delete("api/Categories/" + categoryId)
        };

        return {
            getStates: getStates,
            getState: getState,
            addState: addState,
            editState: editState,
            deleteState: deleteState,

            getCategories: getCategories,
            getCategory: getCategory,
            addCategory: addCategory,
            editCategory: editCategory,
            deleteCategory: deleteCategory
        };
});