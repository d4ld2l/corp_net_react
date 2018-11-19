import type {
  DepartmentPresenterType,
  SearchParticipantPresenter,
  AssociatePresenterType,
  AssistantPresenter,
} from './presenters'

export type PhotoRaw = {
  url: string,
  thumb?: {
    url: string,
  },
  for_profile?: {
    url: string,
  },
  for_community?: {
    url: string,
  },
}

export type BirthDatesNearestRaw = {
  [string]: Array<{
    id: number,
    email: string,
    full_name: string,
    photo: PhotoRaw,
    birthday: string,
  }>,
}

export type LanguageRaw = {
  id: number,
  name: ?string,
  created_at: string,
  updated_at: string,
}

export type LanguageLevelRaw = {
  id: number,
  name: ?string,
  value: ?number,
  created_at: string,
  updated_at: string,
}

export type LanguageSkillRaw = {
  id: number,
  resume_id: ?number,
  language_id: ?number,
  language_level_id: ?number,
  created_at: string,
  updated_at: string,
}

export type AdditionalContactRaw = {
  id: number,
  type: number,
  link: string,
  created_at: string,
  updated_at: string,
  resume_id: number,
}

export type ResumeWorkExperienceRaw = {
  id: number,
  resume_id: ?number,
  position: ?string,
  company_name: ?string,
  region: ?string,
  website: ?string,
  start_date: ?string,
  end_date: ?string,
  experience_description: ?string,
  created_at: string,
  updated_at: string,
}

export type ResumeRecommendationRaw = {
  id: number,
  resume_id: ?number,
  recommender_name: ?string,
  company_and_position: ?string,
  phone: ?string,
  email: ?string,
  created_at: string,
  updated_at: string,
}

export type ResumeEducationRaw = {
  id: number,
  school_name: ?string,
  faculty_name: ?string,
  speciality: ?string,
  end_year: ?number,
  created_at: string,
  updated_at: string,
}

export type EducationLevelRaw = {
  id: number,
  name: ?string,
  created_at: string,
  updated_at: string,
}

export type ResumeRaw = {
  id: number,
  user_id: ?number,
  created_at: string,
  updated_at: string,
  first_name: ?string,
  middle_name: ?string,
  last_name: ?string,
  position: ?string,
  city: ?string,
  phone: ?string,
  email: ?string,
  skype: ?string,
  preferred_contact_type: ?number,
  birthdate: ?string,
  photo?: {
    url: string,
  },
  sex: ?number,
  martial_condition: ?number,
  have_children: ?number,
  skills_description: ?string,
  desired_position: ?string,
  salary_level: ?number,
  employment_type: ?string,
  working_schedule: ?string,
  comment: ?string,
  vacancy_id: ?number,
  documents: ?string,
  professional_specialization_id: ?number,
  candidate_id: ?number,
  education_level_id: ?number,
  experience: ?string,
}

export type CandidateVacancyRaw = {
  id: number,
  candidate_id: number,
  vacancy_id: number,
  current_vacancy_stage_id: number,
  created_at: string,
  updated_at: string,
}

export type VacancyRaw = {}

export type CandidatePermittedAttrsRaw = {
  first_name?: ?string,
  middle_name?: ?string,
  last_name?: ?string,
  birthdate?: ?string,
  candidate_vacancies_attributes?: ?{
    vacancy_id?: ?number,
    current_vacancy_stage_id?: ?number,
  },
  resumes_attributes?: ?{
    position?: ?string,
    city?: ?string,
    phone?: ?string,
    email?: ?string,
    skype?: ?string,
    preferred_contact_type?: ?number,
    photo?: ?string,
    sex?: ?number,
    martial_condition?: ?number,
    have_children?: ?number,
    skills_description?: ?string,
    desired_position?: ?string,
    salary_level?: ?number,
    employment_type?: ?string,
    workind_schedule?: ?string,
    comment?: ?string,
    documents?: ?string,
    vacancy_id?: ?number,
    skill_list?: Array<string>,
    professional_specialization_id?: ?number,
    additional_contacts_attributes?: Array<{
      type?: ?number,
      link?: ?string,
    }>,
    language_skills?: ?Array<{
      language_id: number,
      language_level_id: number,
    }>,
    resume_work_experiences_attributes?: ?Array<{
      position?: ?string,
      company_name?: ?string,
      region?: ?string,
      website?: ?string,
      start_date?: ?string,
      end_date?: ?string,
      experience_description?: ?string,
    }>,
    resume_recommendations_attributes?: ?Array<{
      recommender_name?: ?string,
      company_and_position?: ?string,
      phone?: ?string,
      email?: ?string,
    }>,
    resume_educations_attributes?: ?Array<{
      education_level_id?: ?number,
      school_name?: ?string,
      faculty_name?: ?string,
      speciality?: ?string,
      end_year?: ?string,
    }>,
  },
}

export type CandidateRaw = {
  id: number,
  first_name: ?string,
  middle_name: ?string,
  last_name: ?string,
  birthdate: ?string,
  vacancy_id: ?number,
  created_at: string,
  updated_at: string,
}

export type CandidateWithIncludesRaw = CandidateRaw & {
  candidate_vacancies: Array<CandidateVacancyRaw>,
  resume: ResumeRaw & {
    additional_contacts: Array<AdditionalContactRaw>,
    resume_work_experiences: Array<ResumeWorkExperienceRaw>,
    resume_recommendations: Array<ResumeRecommendationRaw>,
    language_skills: Array<
      LanguageSkillRaw & {
        language: ?LanguageRaw,
        language_level: ?LanguageLevelRaw,
      }
    >,
    resume_educations: Array<
      ResumeEducationRaw & {
        education_level: ?EducationLevelRaw,
      }
    >,
  },
}

export type EventRaw = {
  id: number,
  name: string,
  starts_at: string,
  ends_at: string,
  description: string,
  event_type_id: number,
  created_at: string,
  updated_at: string,
  place: string,
  created_by_id: number,
  participants_count: number,
  created_by?: {
    id: number,
    status: string,
    email: string,
    provider: string,
    uid: string,
    created_at: string,
    updated_at: string,
    role_id: number,
    company_id: ?number,
  },
  event_type?: {
    id: number,
    name: string,
    color: string,
    created_at: string,
    updated_at: string,
  },
  documents?: Array<DocumentRaw>,
  participants: ParticipantsRaw,
}

export type EventTypesRaw = {}

export type EmployeeRaw = {
  city: ?string,
  department: ?string,
  email: ?string,
  full_name: ?string,
  id: number,
  phone: ?string,
  photo: PhotoRaw,
  position: ?string,
  sex: ?string,
  user: ?{
    email: ?string,
    id: ?number,
    roles: ?Array<{
      id: number,
      name: ?string,
    }>,
  },
}

export type TagRaw = {
  id: number,
  name: string,
  taggings_count: number,
}

export type NewsCategoryRaw = {
  created_at: string,
  id: number,
  name: ?string,
  updated_at: string,
}

export type NewsGroupRaw = {
  created_at: string,
  id: number,
  name: ?string,
  updated_at: string,
}

export type DocumentRaw = {
  id: number,
  name: ?string,
  file: ?{
    url: ?string,
  },
  document_attachable_id: number,
  document_attachable_type: ?string,
  created_at: string,
  updated_at: string,
}

export type NewRaw = {
  id: number,
  news_category_id: number,
  user_id: number,
  state: ?string,
  title: ?string,
  preview: ?string,
  body: ?string,
  tags: Array<TagRaw>,
  on_top: boolean,
  published_at: ?string,
  created_at: string,
  updated_at: string,
  news_category: Array<NewsCategoryRaw>,
  news_groups: Array<NewsGroupRaw>,
  documents: Array<DocumentRaw>,
  photos: Array<{
    id: number,
    name: ?string,
    file: ?{
      url: ?string,
    },
    photo_attachable_id: number,
    photo_attachable_type: string,
    created_at: string,
    updated_at: string,
  }>,
}

export type ResumeSourceRaw = {
  id: number,
  name: ?string,
  created_at: string,
  updated_at: string,
}

export type NewsRaw = Array<NewRaw>

export type UserRaw = {}

export type EmployeesRaw = Array<EmployeeRaw>
export type EventsRaw = Array<EventRaw>

export type AssociateRaw = {
  id: number,
  profile_id?: number,
  name: string,
  middlename: string,
  fullname?: string,
  photo: ?{ for_profile: ?{ url: string } },
  position_name: string,
}

export type DepartmentRaw = {
  name_ru: string,
  manager: ?AssociatePresenterType,
  participants: Array<AssociatePresenterType>,
  children: Array<DepartmentPresenterType>,
}

export type DepartmentsRaw = Array<RootDepartmentRaw>

export type RootDepartmentRaw = {
  departments_tree: Array<DepartmentRaw>,
}

export type SearchParticipantRaw = {
  type: 'user' | 'department',
  item: EmployeeRaw | DepartmentRaw,
}

export type SearchParticipantsRaw = {
  all: boolean,
  participants: Array<SearchParticipantRaw | SearchParticipantPresenter>,
}

export type SurveyRaw = {
  id: number,
  name: string,
  survey_type: string,
  symbol: {
    url: string,
    thumb: {
      url: string,
    },
    small_medium: {
      url: string,
    },
    medium: {
      url: string,
    },
  },
  anonymous: boolean,
  questions: Array<{
    id: number,
    wording: string,
    ban_own_answer: boolean,
    image_small_medium_url: boolean,
    offered_variants: Array<{
      id: number,
      wording: string,
    }>,
  }>,
  questions_count: number,
  answers_count: number,
  ends_at: string,
  background: string,
  note: string,
  document: {
    url: string,
  },
}

export type PostRaw = {
  id: number,
  name: string,
  body: string,
  created_at: string,
  edited_at: string,
  deleted_at: string,
  deleted_by_id: number,
  author_id: number,
  can_edit: boolean,
  can_delete: boolean,
  already_liked: boolean,
  in_favorites: boolean,
  community_id: number,
  allow_commenting: boolean,
  comments_count: number,
  likes_count: number,
  author: {
    photo: PhotoRaw,
    full_name: string,
  },
  tag_list: Array<string>,
  comments_list: Array<{
    id: number,
    profile_id: number,
    body: string,
    created_at: string,
    deleted_at: string,
    can_edit: boolean,
    can_delete: boolean,
    already_liked: boolean,
    profile: {
      photo: PhotoRaw,
      full_name: string,
    },
    children: Array<{
      id: number,
      parent_comment_id: number,
      profile_id: number,
      body: string,
      created_at: string,
      deleted_at: string,
      can_edit: boolean,
      can_delete: boolean,
      already_liked: boolean,
      profile: {
        photo: PhotoRaw,
        full_name: string,
      },
    }>,
  }>,
  likes: {
    profile_id: number,
  },
  documents: {
    id: number,
    name: string,
    file: string,
    extension: string,
  },
  photos: {
    id: number,
    name: string,
    file: PhotoRaw,
  },
}

export type ServiceRaw = {}
export type ServicesRaw = Array<ServiceRaw>

export type BidRaw = {}
export type BidsRaw = Array<BidRaw>

export type AssistantRaw = {}
export type AssistantsRaw = Array<AssistantRaw>
