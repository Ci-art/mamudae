import { autorun, IAutorunOptions, IReactionPublic } from 'mobx';
import { useEffect } from 'react';

export const useAutorun = (
  view: (r: IReactionPublic) => any,
  opts?: IAutorunOptions | undefined
) => {
  useEffect(() => autorun(view, opts), [view, opts]);
};
