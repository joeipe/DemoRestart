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

        return {
            getStates: getStates,
            getState: getState,
            addState: addState,
            editState: editState,
            deleteState: deleteState
        };
});