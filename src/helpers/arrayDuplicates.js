function hasDuplicates(a) {
  const noDups = new Set(a);

  if (a.length !== noDups.size) {
    return true;
  }
  return false;
}

export default hasDuplicates;
