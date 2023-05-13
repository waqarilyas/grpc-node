const jsonfile = require("jsonfile");
const moment = require("moment");
const random = require("random");
const simpleGit = require("simple-git");
const FILE_PATH = "./data.json";

const makeCommit = (n) => {
  if (n == 0) return false;

  let x, y, DATE;
  do {
    x = random.int(0, 207);
    y = random.int(0, 6);

    DATE = moment()
      .subtract(1, "y")
      .add(1, "d")
      .add(x, "d")
      .add(y, "d")
      .format();

    // check if this date already has 11 commits
    if (commitCountByDate[DATE] >= 11) {
      console.log(`Too many commits on ${DATE}, generating a new date`);
      DATE = null;
    }
  } while (!DATE);

  commitCountByDate[DATE] = (commitCountByDate[DATE] || 0) + 1;

  const messages = [
    "Add feature",
    "Fix bug",
    "Refactor code",
    "Update documentation",
    "Improve performance",
    "Optimize code",
    "Add tests",
    "Remove dead code",
    "Clean up code",
    "Add comments",
    "Fix typo",
    "Improve readability",
    "Simplify code",
    "Update dependencies",
    "Improve error handling",
    "Add security feature",
    "Add new endpoint",
    "Fix API response",
    "Improve user experience",
    "Add new test case",
    "Improve code structure",
    "Add CSS styles",
    "Fix CSS bug",
    "Update logo",
    "Add new font",
    "Add new icon",
    "Improve accessibility",
  ];

  const message = messages[random.int(0, messages.length - 1)];
  console.log(`${DATE}: ${message}`);

  jsonfile.writeFile(FILE_PATH, { date: DATE, message: message }, () => {
    simpleGit()
      .add([FILE_PATH])
      .commit(message, { "--date": DATE }, makeCommit.bind(this, --n));
  });
};

const commitCountByDate = {};
makeCommit(1000);
