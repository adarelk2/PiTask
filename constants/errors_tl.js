const ERROR_MESSAGES = {
  GENERAL: {
    "UNKNOWN_ERROR": "Isang hindi inaasahang error ang naganap. Pakisubukang muli mamaya.",
    "INVALID_REQUEST": "Di-wastong format ng kahilingan.",
    "MISSING_FIELDS": "Isa o higit pang kinakailangang field ay nawawala.",
    "UNAUTHORIZED": "Wala kang pahintulot na gawin ang aksyong ito.",
    "FORBIDDEN": "Access ay ipinagbabawal.",
    "NOT_FOUND": "Hindi nahanap ang resource.",
    "METHOD_NOT_ALLOWED": "Ang method na ito ay hindi pinapayagan sa endpoint na ito.",
    "RATE_LIMITED": "Masyadong maraming kahilingan. Pakibagalan."
  },
  AUTH: {
    "INVALID_TOKEN": "Di-wastong o nag-expire na token.",
    "LOGIN_FAILED": "Maling username o password.",
    "ACCOUNT_SUSPENDED": "Ang iyong account ay nasuspinde.",
    "EMAIL_NOT_VERIFIED": "Pakivalidate muna ang iyong email upang magpatuloy.",
    "ACCESS_EXPIRED": "Nag-expire na ang iyong session. Pakilog-in muli."
  },
  VALIDATION: {
    "INVALID_EMAIL": "Pakilagay ng wastong email address.",
    "INVALID_WALLET": "Pakilagay ng wastong wallet address.",
    "INVALID_PASSWORD": "Ang password ay dapat may hindi bababa sa 8 characters.",
    "PASSWORD_MISMATCH": "Hindi tugma ang mga password.",
    "INVALID_USERNAME": "Ang username ay dapat 3–20 characters lamang, letters at numbers lang.",
    "INVALID_INPUT": "May ilang hindi wastong mga field.",
    "VALUE_TOO_LOW": "Masyadong mababa ang halaga kaysa sa pinapayagan.",
    "VALUE_TOO_HIGH": "Lumagpas ang halaga sa maximum na pinapayagan.",
    "TITLE_TOO_SHORT": "Ang pamagat ng task ay dapat hindi bababa sa 5 characters.",
    "DESCRIPTION_TOO_SHORT": "Ang deskripsyon ng task ay dapat hindi bababa sa 10 characters.",
    "INVALID_NUMBER": "May kulang o maling numerong halaga.",
    "INVALID_LEVEL": "Ang kinakailangang level ay hindi wasto."
  },
  TASK: {
    "MAX_REWARD": "Ang pinakamataas na gantimpala para sa level na ito ay: ",
    "INVALID_REWARD": "Ang gantimpala ay dapat positibong numero.",
    "INVALID_USER_LEVEL": "Di-wastong user level ang napili.",
    "MAX_USERS_REQUIRED": "Dapat mong tukuyin kung ilang users ang maaaring tapusin ang task.",
    "TASK_NOT_FOUND": "Ang hinihinging task ay hindi umiiral.",
    "TASK_ALREADY_COMPLETED": "Ang task na ito ay natapos na.",
    "PROOF_REQUIRED": "Kailangang magsumite ng ebidensya para sa task na ito.",
    "URL_REQUIRED": "Kailangan ng URL para sa ganitong uri ng task.",
    "URL_INVALID": "Di-wastong URL.",
    "CANNOT_TARGET_HIGHER_LEVEL": "Hindi ka maaaring magbigay ng task sa users na may mas mataas na level kaysa sa iyo.",
    "TASK_TOO_EXPENSIVE": "Lumampas ang kabuuang halaga ng task sa pinapayagang limitasyon.",
    "USER_LEVEL_TOO_LOW": "Hindi sapat ang level mo para sa task na ito.",
    "USER_KD_TOO_LOW": "Hindi sapat ang iyong KD para sa task na ito.",
    "TASK_ALREADY_CLAIMED": "Mayroon ka nang aktibong task na kailangang tapusin.",
    "TASK_ALREADY_CLAIMED_CANNOT_CLAIM_IT_AGAIN": "Nakuha mo na ang task na ito at hindi mo na ito maaaring kunin muli."
  },
  WALLET: {
    "INSUFFICIENT_FUNDS": "Wala kang sapat na Pi sa iyong wallet upang likhain ang task na ito.",
    "INVALID_WALLET_ADDRESS": "Di-wastong Pi wallet address.",
    "WALLET_NOT_CONNECTED": "Walang wallet na nakakonekta.",
    "ESCROW_ERROR": "Nabigong i-lock ang Pi sa escrow."
  },
  DATABASE: {
    "CONNECTION_FAILED": "Nabigong kumonekta sa database.",
    "DUPLICATE_ENTRY": "Umiiral na ang record na ito.",
    "SAVE_FAILED": "Nabigong i-save ang data. Pakisubukang muli.",
    "UPDATE_FAILED": "Nabigong i-update ang record."
  }
};
module.exports = ERROR_MESSAGES;
