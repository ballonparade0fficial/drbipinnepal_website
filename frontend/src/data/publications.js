const publications = [
  {
    title: "Experience of treating COVID-19 with Remdesivir and convalescent plasma in a resource-limited setting: a prospective, observational study",
    url: "https://academic.oup.com/ofid/article/8/8/ofab391/6356052",
  },
  {
    title: "Life style factors associated with the risk of type 2 diabetes mellitus",
    url: "http://thegmj.co/index.php/1/article/view/20",
  },
  {
    title: "ABO blood group discrepancies: Study of prevalence and related factors",
    url: "http://thegmj.co/index.php/1/article/view/22/21",
  },
  {
    title: "Combination of convalescent plasma therapy and repurposed drugs to treat severe COVID-19 patient with multimorbidity",
    url: "https://onlinelibrary.wiley.com/doi/full/10.1002/ccr3.3964",
  },
  {
    title: "Knowledge, Attitude and Practice about voluntary blood donation among young student population of Karachi",
    url: "https://www.researchgate.net/publication/351747610_Final_Project_Dr_Bipin_1",
  },
  {
    title: "Prevalence of ABO and Rh blood groups among individuals attending a tertiary care hospital in Nepal: a retrospective cross-sectional study",
    url: "https://bmjopen.bmj.com/content/16/3/e114395.abstract",
  },
  {
    title: "Blood transfusion services in Nepal: An overview",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC13290234/",
  },
  {
    title: "Patient blood management for cardiovascular surgery: Clinical practice consensus statement",
    url: "https://www.academia.edu/110424371/Patient_blood_management_for_cardiovascular_surgery_Clinical_practice_consensus_statement",
  },
  {
    title: "Steps taken to alleviate under-reporting of transfusion reactions at a public sector hospital in Pakistan",
    url: "https://synapse.koreamed.org/articles/1092304",
  },
  {
    title: "Non-communicable disease pattern in adults seeking preventive general health checkup",
    url: "https://www.researchgate.net/publication/330547261_Non-communicable_disease_pattern_in_adults_seeking_preventive_general_health_checkup",
  },
  {
    title: "Acquired B antigen in ABO blood group system: Non-secretor group A1 subtype, Rh positive with auto antibodies in a patient with urinary tract infection with E. coli",
    url: "https://www.researchgate.net/publication/330548070_Acquired_B_antigen_in_ABO_blood_group_system_Non-secretor_group_A1_subtype_Rh_positive_with_auto_antibodies_in_a_patient_with_urinary_tract_infection_with_E_coli",
  },
  {
    title: "The Spice Route's perspective on family medicine via the social media project #1WordforFamilyMedicine",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5749051/",
  },
  {
    title: "Modified Shanfield Ureteric Reimplantation with or Without Ureteric Tailoring in Primary Obstructive Megaureter",
    url: "https://www.researchgate.net/publication/411187713_Modified_Shanfield_Ureteric_Reimplantation_with_or_Without_Ureteric_Tailoring_in_Primary_Obstructive_Megaureter",
  },
  {
    title: "Blood Bank Challenges of COVID-19 Pandemic at Blood Transfusion Service at Tertiary Care Hospital: Grande International Hospital",
    url: "https://www.researchgate.net/publication/414605012_Blood_Bank_Challenges_of_COVID-19_Pandemic_At_Blood_Transfusion_Service_At_Tertiary_Care_Hospital_Grande_International_Hospital",
  },
  {
    title: "Cardiac Society of Nepal Consensus Recommendations for INR Monitoring and Warfarin Management",
    url: "https://www.researchgate.net/profile/Chandra-Adhikari/publication/405464388_Cardiac_Society_of_Nepal_Consensus_Recommendations_for_INR_Monitoring_and_Warfarin_Management/links/6a1a6705842cec72a3f5296e/Cardiac-Society-of-Nepal-Consensus-Recommendations-for-INR-Monitoring-and-Warfarin-Management.pdf",
  },
  {
    title: "The Effect of Metformin on Coagulation Profiles in Type II Diabetes Mellitus: A Tertiary Care Hospital of Nepal",
    url: "https://www.researchgate.net/publication/398954956_The_Effect_of_Metformin_on_Coagulation_Profiles_in_Type_II_Diabetes_Mellitus_A_Tertiary_Care_Hospital_of_Nepal",
  },
  {
    title: "Clinically Significant Anti-E and Anti-Jka Alloantibodies Identified in a 24-year-old Female suspected of Delayed Hemolytic Anemia Requiring Emergency Transfusion",
    url: "https://www.researchgate.net/publication/398957232_Clinically_Significant_Anti-E_and_Anti-Jka_Alloantibodies_Identified_in_a_24-year-old_Female_suspected_of_Delayed_Hemolytic_Anemia_Requiring_Emergency_Transfusion",
  },
  {
    title: "Left ventricular dysfunction in patients with chronic obstructive pulmonary disease (COPD)",
    url: "https://www.researchgate.net/publication/393876782_Left_ventricular_dysfunction_in_patients_with_chronic_obstructive_pulmonary_disease_COPD",
  },
  {
    title: "Pattern of Blood Components Utilization in Grande International Hospital: A Tertiary Care Hospital of Nepal",
    url: "https://www.researchgate.net/publication/393878633_Pattern_of_Blood_Components_Utilization_in_Grande_International_Hospital_A_Tertiary_Care_Hospital_of_Nepal",
  },
  {
    title: "Seroprevalence of transfusion transmissible infections among blood donors at a tertiary care hospital in urban area of Nepal",
    url: "https://www.researchgate.net/publication/390628743_Seroprevalence_of_transfusion_transmissible_infections_among_blood_donors_at_a_tertiary_care_hospital_in_urban_area_of_Nepal",
  },
  {
    title: "Treatment of COVID-19 in Hospitalized Patients with Remdesivir, Convalescent Plasma or Both in a Resource Limited Setting: A Prospective Study",
    url: "https://www.researchgate.net/publication/349931606_Treatment_of_COVID-19_in_Hospitalized_Patients_with_Remdesivir_Convalescent_Plasma_or_Both_in_a_Resource_Limited_Setting_A_Prospective_Study",
  },
  {
    title: "Challenges faced by the laboratory professionals during COVID-19 pandemic at tertiary care hospital, Kathmandu, Nepal",
    url: "https://www.researchgate.net/publication/360190591_Challenges_faced_by_the_laboratory_professionals_during_COVID-19_pandemic_at_tertiary_care_hospital_Kathmandu_Nepal",
  },
  {
    title: "Knowledge, Attitude and Practice Regarding the Voluntary Blood Donation Among the Young Student Population of Karachi",
    url: "https://www.researchgate.net/publication/354372273_Knowledge_Attitude_and_Practice_Regarding_the_Voluntary_Blood_Donation_Among_the_Young_Student_Population_of_Karachi",
  },
  {
    title: "Viral Inactivation and Enrichment of Factor VIII, Factor XIII, Fibrinogen and Von Willebrand Factor from Fresh Frozen Plasma",
    url: "https://www.researchgate.net/publication/354372440_Viral_Inactivation_and_Enrichment_of_Factor_VIII_Factor_XIII_Fibrinogen_and_Von_Willebrand_Factor_VWF_Multimers_from_Fresh_Frozen_Plasma_FFPUsing_VIPS_Plasma_Virus_Inactivation_Treatment_System",
  },
  {
    title: "Haemovigilance reports of Adverse Blood Donor Reaction among Voluntary Blood Donors in a Tertiary care hospital in Kathmandu, Nepal",
    url: "https://www.researchgate.net/publication/354090764_Haemovigilance_reports_of_Adverse_Blood_Donor_Reaction_among_Voluntary_Blood_Donors_in_a_Tertiary_care_hospital_in_Kathmandu_Nepal_Bipin_Nepal",
  },
  {
    title: "CYTOPENIAS IN VARIOUS COMBINATIONS FOUND IN COMPLETE BLOOD COUNTS (CBC) PERFORMED IN DOW DIAGNOSTIC RESEARCH & REFERRAL LABORATORY",
    url: "https://www.researchgate.net/publication/351747589_Cytopenias_in_Various_Combinations_Found_in_Routine_Complete_Blood_Counts",
  },
  {
    title: "Non-Secretor A Subgroup with Acquired B Antigen, Naturally and Acquired Immune Anti-A1 Antibodies in a Patient with Carcinoma of Esophagus",
    url: "http://publication.pumhs.edu.pk/index.php/ojs/article/view/182",
  },
  {
    title: "Cytopenias in Various Combinations Found in Routine Complete Blood Counts",
    url: "http://publication.pumhs.edu.pk/index.php/ojs/article/view/137",
  },
  {
    title: "Anti-c Alloimmunization Associated with Acute Hemolytic Transfusion Reaction in a Chronically Transfused Beta-Thalassemia Patient: A Case Report",
    url: "https://www.researchgate.net/publication/414613260_Anti-c_Alloimmunization_Associated_with_Acute_Hemolytic_Transfusion_Reaction_in_a_Chronically_Transfused_b-Thalassemia_Patient_A_Case_Report",
  },
  {
    title: "Prevalence of ABO and Rh blood groups among individuals attending a tertiary care hospital in Nepal: a retrospective cross-sectional study",
    url: "https://www.researchgate.net/publication/401766559_Prevalence_of_ABO_and_Rh_blood_groups_among_individuals_attending_a_tertiary_care_hospital_in_Nepal_a_retrospective_cross-sectional_study",
  },
  {
    title: "An Innovative Technique for Smart Repair of Induction Motors",
    url: "https://nce.edu.np/wp-content/uploads/2025/07/An-innovative.pdf",
  },
];

export default publications;
