import React from 'react';
import { Button, ButtonProps, Spinner } from 'reactstrap';

export const LoadingButton: React.FC<ButtonProps> = (props) => {
  if (props.disabled) {
    return (
      <Button className="d-flex align-items-center" color="primary" disabled>
        <Spinner className="mr-2" size="sm">
          불러오는 중...
        </Spinner>
        {props.children}
      </Button>
    );
  } else {
    return (
      <Button className="d-flex align-items-center" color="primary">
        {props.children}
      </Button>
    );
  }
};
