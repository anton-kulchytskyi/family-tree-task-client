import { IFamilyMember } from './FamilyMember';

export interface ITreeNode {
  data: IFamilyMember | null;
  isExpanded: boolean;
  children: ITreeNode[];
}
