function createEmployeeRecord(recordArray) {
    return {
        firstName: recordArray[0],
        familyName: recordArray[1],
        title: recordArray[2],
        payPerHour: recordArray[3],
        timeInEvents: [],
        timeOutEvents: [],
    };
}

function createEmployeeRecords(recordArrayArray) {
    let newArray = [];
    recordArrayArray.forEach((recordArray) => {
        newArray.push(createEmployeeRecord(recordArray));
    });
    return newArray;
}

function createTimeInEvent(date) {
    let dateSplit = date.split(" ");
    this.timeInEvents.push({ type: "TimeIn", hour: parseInt(dateSplit[1]), date: dateSplit[0] });
    return this;
}

function createTimeOutEvent(date) {
    let dateSplit = date.split(" ");
    this.timeOutEvents.push({ type: "TimeOut", hour: parseInt(dateSplit[1]), date: dateSplit[0] });
    return this;
}

function hoursWorkedOnDate(workOnDate) {
    let timeInDates = this.timeInEvents;
    let timeOutDates = this.timeOutEvents;
    let timeInDatesOnDates = timeInDates.find((dateObj) => dateObj.date == workOnDate);
    let timeOutDatesOnDates = timeOutDates.find((dateObj) => dateObj.date == workOnDate);

    return (parseInt(timeOutDatesOnDates.hour) - parseInt(timeInDatesOnDates.hour)) / 100;
}

function wagesEarnedOnDate(workOnDate) {
    return hoursWorkedOnDate.call(this, workOnDate) * this.payPerHour;
}

function calculatePayroll(employees) {
    let payroll = 0;
    employees.forEach((employee) => {
        payroll += allWagesFor.call(employee);
    });
    return payroll;
}

function findEmployeeByFirstName(employees, firstName) {
    return employees.find((employee) => employee.firstName === firstName);
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date;
    });

    let payable = eligibleDates.reduce(
        function (memo, d) {
            return memo + wagesEarnedOnDate.call(this, d);
        }.bind(this),
        0
    ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable;
};
