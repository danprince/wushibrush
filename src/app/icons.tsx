function I(cmd: string) {
  return ({ width = 24, height = 24, color = "currentColor" }) => {
    return (
      <svg
        class="icon"
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        fill={color}
        fill-rule="evenodd"
        clip-rule="evenodd"
        viewBox="0 0 24 24"
      >
        <path d={cmd} />
      </svg>
    );
  }
}

export const Brush = I("M8.7645 14.9283C9.37141 15.8007 10.8242 17.2839 11.7801 16.237C12.0273 15.9663 12.709 15.36 13.6185 14.5513C17.1056 11.4504 23.9409 5.37211 22.469 3.81122C21.6032 2.89297 18.1516 5.83969 14.677 8.80604C14.0096 9.37579 13.3414 9.94627 12.6905 10.4902C12.5644 10.5873 12.4235 10.6943 12.2719 10.8094C10.7352 11.976 8.1016 13.9754 8.7645 14.9283Z M1.32641 19.1978L1.32999 19.1972C2.33487 19.0397 2.62244 18.9946 4.16825 17.4488L4.24633 17.3707C6.10923 15.5076 6.34604 15.2708 7.08506 15.4601C8.80193 15.8997 9.12149 17.0202 9.12149 18.4012C9.12149 20.582 5.2524 21.0754 1.32641 19.1978Z");
export const Eraser = I("M14.539 2.84825C14.1485 2.45772 13.5153 2.45772 13.1248 2.84825L1.81271 14.1603C1.42219 14.5509 1.42219 15.184 1.81271 15.5746L5.92544 19.6873C8.26858 22.0304 12.0676 22.0304 14.4107 19.6873L22.1873 11.9107C22.5778 11.5202 22.5778 10.887 22.1873 10.4965L14.539 2.84825ZM9.00003 9.80145L3.93403 14.8675L7.33965 18.2731C8.90175 19.8352 11.4344 19.8352 12.9965 18.2731L15.1801 16.0895L9.00003 9.80145Z");
export const Rect = I("M4.25758 5.25758C4.25758 4.7053 4.7053 4.25758 5.25758 4.25758H18.7424C19.2947 4.25758 19.7424 4.7053 19.7424 5.25758V18.7424C19.7424 19.2947 19.2947 19.7424 18.7424 19.7424H5.25758C4.7053 19.7424 4.25758 19.2947 4.25758 18.7424V5.25758ZM6.25758 6.25758V17.7424H17.7424V6.25758H6.25758Z");
export const Circle = I("M12 17.7076C15.1522 17.7076 17.7076 15.1522 17.7076 12C17.7076 8.84776 15.1522 6.29236 12 6.29236C8.84776 6.29236 6.29236 8.84776 6.29236 12C6.29236 15.1522 8.84776 17.7076 12 17.7076ZM12 19.7076C16.2568 19.7076 19.7076 16.2568 19.7076 12C19.7076 7.74319 16.2568 4.29236 12 4.29236C7.74319 4.29236 4.29236 7.74319 4.29236 12C4.29236 16.2568 7.74319 19.7076 12 19.7076Z");
export const Line = I("M16.2473 8.15743C17.2434 8.15743 18.0509 7.34994 18.0509 6.35384C18.0509 5.35775 17.2434 4.55025 16.2473 4.55025C15.2512 4.55025 14.4437 5.35775 14.4437 6.35384C14.4437 6.4752 14.4557 6.59375 14.4785 6.70839L6.44247 14.7444C6.32783 14.7216 6.20928 14.7096 6.08792 14.7096C5.09183 14.7096 4.28433 15.5171 4.28433 16.5132C4.28433 17.5093 5.09183 18.3168 6.08792 18.3168C7.08402 18.3168 7.89152 17.5093 7.89152 16.5132C7.89152 16.3918 7.87953 16.2733 7.85668 16.1586L15.8927 8.1226C16.0074 8.14545 16.1259 8.15743 16.2473 8.15743Z");
export const Eyedropper = I("M19.9508 8.57635C21.1919 7.33531 21.1919 5.32317 19.9508 4.08213C18.7098 2.84108 16.6977 2.84108 15.4566 4.08213L12.8961 6.64264L12.0909 5.83739C11.7003 5.44687 11.0672 5.44687 10.6766 5.83739L9.1477 7.36633C8.75718 7.75686 8.75718 8.39002 9.1477 8.78055L10.2036 9.83646C9.97996 9.96182 9.76958 10.1196 9.57936 10.3098L5.08439 14.8048C4.30092 15.5883 4.06755 16.7135 4.38429 17.7006L4.08212 18.0028C3.54419 18.5407 3.54419 19.4129 4.08212 19.9508C4.62005 20.4888 5.49221 20.4888 6.03014 19.9508L6.3891 19.5919C7.33602 19.8359 8.38369 19.5871 9.1252 18.8456L13.6202 14.3507C13.8104 14.1604 13.9682 13.9501 14.0936 13.7264L15.2195 14.8523C15.61 15.2428 16.2431 15.2428 16.6337 14.8523L18.1626 13.3234C18.5531 12.9328 18.5531 12.2997 18.1626 11.9091L17.3903 11.1369L19.9508 8.57635ZM10.9936 11.7241C11.2362 11.4814 11.5881 11.4146 11.8908 11.5237L12.4063 12.0392C12.5154 12.3419 12.4486 12.6938 12.2059 12.9364L7.71098 17.4314C7.3762 17.7662 6.8334 17.7662 6.49861 17.4314C6.16382 17.0966 6.16382 16.5538 6.49861 16.219L10.9936 11.7241Z");
export const Undo = I("M8.86473 5.74824C9.96215 5.11465 11.207 4.78109 12.4742 4.78109C13.7414 4.78109 14.9862 5.11465 16.0836 5.74824C17.1811 6.38183 18.0924 7.29313 18.7259 8.39055C19.3595 9.48796 19.6931 10.7328 19.6931 12C19.6931 13.2672 19.3595 14.512 18.7259 15.6095C18.0924 16.7069 17.1811 17.6182 16.0836 18.2518C14.9862 18.8853 13.7414 19.2189 12.4742 19.2189C11.9219 19.2189 11.4742 18.7712 11.4742 18.2189C11.4742 17.6666 11.9219 17.2189 12.4742 17.2189C13.3903 17.2189 14.2903 16.9778 15.0836 16.5197C15.877 16.0617 16.5358 15.4028 16.9939 14.6095C17.4519 13.8161 17.6931 12.9161 17.6931 12C17.6931 11.0839 17.4519 10.1839 16.9939 9.39055C16.5358 8.59717 15.877 7.93835 15.0836 7.48029C14.2903 7.02224 13.3903 6.78109 12.4742 6.78109C11.5581 6.78109 10.6581 7.02224 9.86473 7.48029C9.50639 7.68718 9.1755 7.93503 8.87816 8.21773L10.3272 9.29653C10.6338 9.52478 10.7834 9.90781 10.7128 10.2834C10.6422 10.6591 10.3636 10.9616 9.99508 11.0629L5.67331 12.2508C5.37628 12.3325 5.05819 12.2727 4.8111 12.0887C4.56401 11.9047 4.41549 11.6172 4.40853 11.3092L4.30717 6.82828C4.29853 6.44617 4.50845 6.09255 4.84805 5.91716C5.18764 5.74178 5.59751 5.77531 5.90409 6.00355L7.25693 7.01073C7.72827 6.51785 8.26909 6.09214 8.86473 5.74824Z");
export const Redo = I("M15.1353 5.74824C14.0379 5.11465 12.793 4.78109 11.5258 4.78109C10.2586 4.78109 9.01379 5.11465 7.91638 5.74824C6.81896 6.38183 5.90766 7.29313 5.27407 8.39055C4.64048 9.48796 4.30692 10.7328 4.30692 12C4.30692 13.2672 4.64048 14.512 5.27407 15.6095C5.90766 16.7069 6.81896 17.6182 7.91638 18.2518C9.01379 18.8853 10.2586 19.2189 11.5258 19.2189C12.0781 19.2189 12.5258 18.7712 12.5258 18.2189C12.5258 17.6666 12.0781 17.2189 11.5258 17.2189C10.6097 17.2189 9.70975 16.9778 8.91637 16.5197C8.123 16.0617 7.46418 15.4028 7.00612 14.6095C6.54807 13.8161 6.30692 12.9161 6.30692 12C6.30692 11.0839 6.54807 10.1839 7.00612 9.39055C7.46418 8.59717 8.123 7.93835 8.91637 7.48029C9.70975 7.02224 10.6097 6.78109 11.5258 6.78109C12.4419 6.78109 13.3419 7.02224 14.1353 7.48029C14.4936 7.68718 14.8245 7.93503 15.1219 8.21773L13.6728 9.29653C13.3662 9.52478 13.2166 9.90781 13.2872 10.2834C13.3578 10.6591 13.6364 10.9616 14.0049 11.0629L18.3267 12.2508C18.6237 12.3325 18.9418 12.2727 19.1889 12.0887C19.436 11.9047 19.5845 11.6172 19.5915 11.3092L19.6928 6.82828C19.7015 6.44617 19.4916 6.09255 19.152 5.91716C18.8124 5.74178 18.4025 5.77531 18.0959 6.00355L16.7431 7.01073C16.2717 6.51785 15.7309 6.09214 15.1353 5.74824Z");
export const GitHub = I("M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z");
export const Download = I("M13.0438 5.52687C13.0438 4.97458 12.5961 4.52687 12.0438 4.52687C11.4915 4.52687 11.0438 4.97458 11.0438 5.52687V10.3003H9.11975C8.72744 10.3003 8.37138 10.5297 8.2092 10.8869C8.04702 11.2441 8.10869 11.6631 8.3669 11.9585L11.2471 15.2529C11.437 15.4701 11.7115 15.5948 12 15.5948C12.2885 15.5948 12.563 15.4701 12.7528 15.2529L15.6331 11.9585C15.8913 11.6631 15.953 11.2441 15.7908 10.8869C15.6286 10.5297 15.2726 10.3003 14.8802 10.3003H13.0438V5.52687Z M7.36523 14.5948C7.36523 14.0425 6.91752 13.5948 6.36523 13.5948C5.81295 13.5948 5.36523 14.0425 5.36523 14.5948V18.4731C5.36523 19.0254 5.81295 19.4731 6.36523 19.4731H17.6348C18.1871 19.4731 18.6348 19.0254 18.6348 18.4731V14.5948C18.6348 14.0425 18.1871 13.5948 17.6348 13.5948C17.0825 13.5948 16.6348 14.0425 16.6348 14.5948V17.4731H7.36523V14.5948Z");

