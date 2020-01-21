export const theme = {
  circleMixin: (p: string, bc: string) => `
    border-radius: 100%;
    padding: ${p};
    background-color: ${bc};
    box-shadow: 0px 1px 4px 1px rgba(0,0,0,0.2);
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
    `
};

export default theme;
