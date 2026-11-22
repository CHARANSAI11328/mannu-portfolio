-- ==============================================================================
-- SHAIK MANSOOR PERSONAL FITNESS PLATFORM
-- INITIAL SEED DATA (VERIFIED CLIENT FACTS ONLY)
-- ==============================================================================

-- 1. CONTACT SETTINGS SEED
INSERT INTO contact_settings (
  id,
  whatsapp_number,
  phone_number,
  email,
  instagram_handle,
  gym_name,
  gym_address,
  google_maps_url,
  availability_notes
) VALUES (
  'primary',
  '+919876543210',
  '+919876543210',
  'contact@mansoorfitness.com',
  'mansoor_fitness',
  '7 Eleven Fitness Studio',
  '7 Eleven Fitness Studio, Bapatla, Andhra Pradesh, India',
  'https://maps.google.com/?q=7+Eleven+Fitness+Studio+Bapatla',
  'Monday to Saturday | Morning & Evening Slots Available'
) ON CONFLICT (id) DO UPDATE SET
  whatsapp_number = EXCLUDED.whatsapp_number,
  gym_name = EXCLUDED.gym_name,
  gym_address = EXCLUDED.gym_address;

-- 2. MONTHLY PRICING PLANS (THREE EXACT PLANS)
INSERT INTO monthly_plans (name, tagline, price_inr, billing_period, target_audience, features, is_highlighted, is_active, display_order)
VALUES
  (
    'FOUNDATION',
    'Essential guidance for beginners starting their fitness journey.',
    999,
    'month',
    'Beginners',
    ARRAY[
      'Basic workout structure & plan',
      'Fundamental exercise form guidance',
      'Beginner fitness routines',
      'General fitness & routine support'
    ],
    FALSE,
    TRUE,
    1
  ),
  (
    'TRANSFORMATION',
    'Structured coaching for targeted muscle gain or fat loss progress.',
    1999,
    'month',
    'Goal-oriented clients',
    ARRAY[
      'Personalized workout structure',
      'Muscle gain or fat loss focus',
      'Exercise form reviews & feedback',
      'Weekly progress discussions',
      'Individual fitness guidance'
    ],
    TRUE,
    TRUE,
    2
  ),
  (
    'ELITE COACHING',
    'Comprehensive personal mentorship for peak individual results.',
    3999,
    'month',
    'Clients seeking intensive personal guidance',
    ARRAY[
      'Individualized training approach',
      'Personal fitness & mechanics assessment',
      'Agreed one-to-one coaching sessions',
      'Priority communication & direct access',
      'Closer progress monitoring & adjustments'
    ],
    FALSE,
    TRUE,
    3
  );

-- 3. ACHIEVEMENTS (VERIFIED CLIENT CREDENTIALS)
INSERT INTO achievements (title, ranking, event, description, display_order, is_published)
VALUES
  (
    '1st Place Champion',
    '1st Place',
    'Bodybuilding Competition, Bapatla',
    '1st place at regional bodybuilding competition held in Bapatla.',
    1,
    TRUE
  ),
  (
    '2nd Place Silver Medalist',
    '2nd Place',
    'Bodybuilding Competition, ANU',
    '2nd place at Acharya Nagarjuna University (ANU) bodybuilding competition.',
    2,
    TRUE
  );

-- 4. TRAINING PROGRAMS (INITIAL SIX DISCIPLINES)
INSERT INTO training_programs (slug, title, category, description, target_audience, goals, benefits, features, training_modes, display_order, is_published)
VALUES
  (
    'muscle-building',
    'Muscle Building',
    'Hypertrophy',
    'Targeted hypertrophy protocols focusing on mechanical tension, volume management, and muscle group symmetry.',
    'Men looking to build lean muscle mass with structured progression.',
    ARRAY['Systematic progressive overload', 'Targeted muscular hypertrophy', 'Form mastery on key compound movements'],
    ARRAY['Structured weekly training splits', 'Personalized exercise selection', 'Volume and recovery monitoring'],
    ARRAY['Bi-weekly form review', 'Custom rep & set periodization', 'Direct guidance from Mansoor'],
    ARRAY['online', 'offline'],
    1,
    TRUE
  ),
  (
    'fat-loss',
    'Fat Loss',
    'Conditioning',
    'Structured fat loss training combining strength preservation with high-efficiency metabolic conditioning.',
    'Men seeking to drop excess body fat while maintaining muscle definition.',
    ARRAY['Sustainable caloric management', 'Muscle retention during calorie deficit', 'Cardiovascular endurance improvement'],
    ARRAY['Tailored energy expenditure protocols', 'Joint-friendly conditioning routines', 'Practical body recomposition habits'],
    ARRAY['Weekly progress tracking', 'Cardio & resistance balancing', 'Habit & lifestyle adjustments'],
    ARRAY['online', 'offline'],
    2,
    TRUE
  ),
  (
    'strength-training',
    'Strength Training',
    'Performance',
    'Systematic power and raw strength development centered on fundamental compound lifts and kinetic safety.',
    'Lifters seeking heavier lifts, CNS efficiency, and durable physical resilience.',
    ARRAY['Substantial compound lift gains', 'Kinetic chain strengthening', 'Injury prevention through proper biomechanics'],
    ARRAY['Technique breakdown and optimization', 'RPE and load management', 'Enhanced bone density and posture'],
    ARRAY['Bar path and form analysis', 'Plateau-breaking variations', 'Direct lifting feedback'],
    ARRAY['online', 'offline'],
    3,
    TRUE
  ),
  (
    'bodybuilding-preparation',
    'Bodybuilding Preparation',
    'Competitive',
    'Competitive athlete preparation informed by Mansoor''s stage experience and podium achievements.',
    'Aspiring physique competitors and advanced lifters wanting peak conditioning.',
    ARRAY['Maximum muscular definition', 'Physique proportion and symmetry', 'Stage presence and mandatory posing practice'],
    ARRAY['Contest prep protocol guidance', 'Posing posture and muscle control drills', 'Mental discipline and peak conditioning strategies'],
    ARRAY['Weekly condition check-ins', 'Posing analysis', 'Stage preparation guidance'],
    ARRAY['offline'],
    4,
    TRUE
  ),
  (
    'beginner-fitness',
    'Beginner Fitness',
    'Foundations',
    'A safe, patient, step-by-step introduction to resistance training, gym etiquette, and form fundamentals.',
    'Men stepping into the gym for the first time or restarting after a hiatus.',
    ARRAY['Gym confidence and routine consistency', 'Flawless execution of basic movement patterns', 'Injury-free foundational strength'],
    ARRAY['Low-intimidation coaching style', 'Clear machine and barbell instruction', 'Gradual adaptation to workload'],
    ARRAY['Basic movement breakdown', 'Weekly check-ins and encouragement', 'Accessible exercise alternatives'],
    ARRAY['online', 'offline'],
    5,
    TRUE
  ),
  (
    'general-fitness-conditioning',
    'General Fitness & Conditioning',
    'General Health',
    'Holistic physical fitness designed for working professionals needing energy, mobility, and stamina.',
    'Men balancing demanding schedules who need realistic, energizing workouts.',
    ARRAY['Daily energy and vitality', 'Spinal posture and hip mobility', 'Functional all-around athleticism'],
    ARRAY['Time-efficient 45–60 minute sessions', 'Reduced stress and sedentary fatigue', 'Sustainable year-round habit'],
    ARRAY['Flexible session pacing', 'Workplace posture remedies', 'Straightforward weekly routine'],
    ARRAY['online', 'offline'],
    6,
    TRUE
  );
