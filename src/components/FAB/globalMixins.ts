export const theme = {
  circleMixin: (p: string, bc: string) => `
    border-radius: 100%;
    padding: ${p};
    background-color: ${bc};
    box-shadow: 0px 1px 4px 1px rgba(0,0,0,0.2);
    overflow: hidden;
  touch-action: none;
  user-select: none;
    `,
  centeredCircleMixin: () => `
    position: absolute;
    left: 0%;
    right: 0%;
    margin-left: auto;
    margin-right: auto;
    width: 0px;
    `,
  centeredIconMixin: () => `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center; 
    align-items: center;
    `,
};

export default theme;
