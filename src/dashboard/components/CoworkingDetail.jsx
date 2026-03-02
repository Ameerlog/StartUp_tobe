import {
  User,
  Briefcase,
  Linkedin,
  MapPin,
  Calendar,
  Sparkles,
  Building2,
  ExternalLink,
  CheckCircle,
  Copy,
  Edit,
} from 'lucide-react'
import { Link } from 'react-router-dom'

function parseSkillString(skillString) {
  if (!skillString) return { skill: '', industry: '', location: '' }
  const parts = skillString.split(' - ')
  return {
    skill: parts[0] || '',
    industry: parts[1] || '',
    location: parts[2] || '',
  }
}

function InfoRow({ icon: Icon, label, value, copy }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
        <Icon size={16} className="text-gray-500" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-500">{label}</p>
        <div className="flex items-center gap-2">
          <p className="font-medium text-gray-900 text-sm truncate">{value || '—'}</p>
          {copy && value && (
            <button className="p-1 hover:bg-gray-100 rounded">
              <Copy size={12} className="text-gray-400" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export function CoworkingDetail({ profile }) {
  const parsed = parseSkillString(profile.skill)
  const skill = parsed.skill || profile.primarySkill
  const industry = parsed.industry || profile.industry
  const location = parsed.location || profile.location

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header Card */}
      <div className="gd-card overflow-hidden">
        <div className="p-6">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
              {profile.profilePhoto ? (
                <img
                  src={profile.profilePhoto}
                  alt={profile.fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl font-bold text-amber-700">
                  {profile.fullName
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .slice(0, 2)}
                </span>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{profile.fullName}</h1>
                  <p className="text-gray-500 mt-1">
                    {skill}
                    {industry && ` • ${industry}`}
                  </p>
                  <div className="flex items-center gap-2 mt-3 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700">
                      <CheckCircle size={12} />
                      Active
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                      {profile.primaryRole}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Member since</p>
                  <p className="font-semibold text-gray-900">{profile.joinedDate}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-100">
            <Link to="/coworker-form" className="gd-btn-primary">
              <Edit size={16} />
              Edit Profile
            </Link>
            {profile.linkedinUrl && (
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="gd-btn-secondary"
              >
                <Linkedin size={16} />
                View LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="gd-card p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Profile Details</h3>
          <div className="space-y-4">
            <InfoRow icon={Briefcase} label="Role" value={profile.primaryRole} />
            <InfoRow icon={Sparkles} label="Primary Skill" value={skill} />
            <InfoRow icon={Building2} label="Industry" value={industry} />
            <InfoRow icon={MapPin} label="Location" value={location} />
          </div>
        </div>

        <div className="gd-card p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Account</h3>
          <div className="space-y-4">
            <InfoRow icon={Calendar} label="Joined" value={profile.joinedDate} />
            <InfoRow icon={User} label="Profile ID" value={profile.profileId} copy />
            {profile.linkedinUrl && (
              <div className="flex items-center gap-3 pt-2">
                <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <Linkedin size={16} className="text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500">LinkedIn</p>
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue-600 text-sm hover:underline truncate block flex items-center gap-1"
                  >
                    Open profile <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Visibility note */}
      <div className="gd-card p-4 border-l-4 border-l-amber-500 bg-amber-50">
        <p className="text-sm text-amber-800">
          <strong>Visible to network.</strong> Your co-working profile is visible to other members
          for networking and collaboration. You can update or remove it anytime from the form.
        </p>
      </div>
    </div>
  )
}
