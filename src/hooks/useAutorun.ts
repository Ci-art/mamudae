import { autorun, IAutorunOptions, IReactionPublic } from 'mobx';
import { useEffect } from 'react';

export const useAutorun = (
  view: (r: IReactionPublic) => any,
  opts?: IAutorunOptions | undefined
) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => autorun(view, opts), []);
};
