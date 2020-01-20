export const theme = {
  circleMixin: (p: string, bc: string) => `
    border-radius: 100%;
    padding: ${p};
    background-color: ${bc};
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