export interface Diagnosis {
  id: string;
  user_id: string;
  patient_id: string;
  scan_date: string;
  created_at: string;
  analysis_date: string;
  tumor_detected: boolean;
  tumor_type: string | null;
  confidence: number;
  location: string | null;
  size: string | null;
  volume: string | null;
  scan_type: string;
  field_strength: string;
  processing_time: string;
  ai_model: string;
  sensitivity: number;
  specificity: number;
  precision: number;
  recall: number;
  f1_score: number;
}
