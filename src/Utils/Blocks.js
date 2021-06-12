export const pollingTest = (oldPosRef, currentOffset, pollingThresold) => {
  if (!oldPosRef.current.x) {
    oldPosRef.current = {
      ...currentOffset,
    };
  }
  if (
    Math.abs(currentOffset?.x - oldPosRef.current?.x) >= pollingThresold ||
    Math.abs(currentOffset?.y - oldPosRef.current?.y) >= pollingThresold
  ) {
    oldPosRef.current.x = currentOffset.x;
    oldPosRef.current.y = currentOffset.y;
    return true;
  }
  return false;
};
