import React from 'react';
import { Button } from '@mui/material';

const AuthThirdParty: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-sm font-normal text-gray-500 mt-[8%] mb-[4%]">
        or continue with
      </p>
      <div className="flex flex-row justify-between">
        <Button>
          <img
            className="w-[65%]"
            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/sign_in-svg3.svg"
            alt="github"
          />
        </Button>
        <Button>
          <img
            className="w-[60%]"
            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/sign_in-svg2.svg"
            alt="google"
          />
        </Button>
        <Button>
          <img
            className="w-[80%]"
            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/sign_in-svg4.svg"
            alt="twitter"
          />
        </Button>
      </div>
    </div>
  );
};

export default AuthThirdParty;
