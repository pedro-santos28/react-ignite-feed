export type UserFormInput = {
    name: string;
    role: string;
    avatarFile: FileList;
    bannerFile: FileList;
}

export type ModalEditUserProps = {
    mutate: () => void
    authorId?: number
  }