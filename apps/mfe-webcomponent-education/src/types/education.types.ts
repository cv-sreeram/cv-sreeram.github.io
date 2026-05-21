export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  dateTime: string;
  description: string;
  skills: SkillTag[];
}

export interface SkillTag {
  label: string;
  primary?: boolean;
}
