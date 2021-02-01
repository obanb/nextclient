import { testfn } from '../../components/Dashboard/components/testik';

let test = null;

module.exports = (req, res) => {
  if (test) {
    const val = test();
    res.status(200).json(`${val}CACHED`);
    return;
  }
  test = testfn;

  res.status(200).json(`${test()}NEW`);
};
